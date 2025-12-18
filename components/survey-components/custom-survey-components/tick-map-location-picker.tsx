'use client';

import React, { useEffect, useEffectEvent, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { CommonResponseComponentProps, getLocaleStringTextByCode } from '@/components/survey-renderer/SurveySingleItemView/utils';
import { ResponseItem } from 'survey-engine/data_types';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

// Dynamically import Leaflet map components to avoid SSR issues
const MapContainer = dynamic(
    () => import('react-leaflet').then((mod) => mod.MapContainer),
    { ssr: false }
);

const TileLayer = dynamic(
    () => import('react-leaflet').then((mod) => mod.TileLayer),
    { ssr: false }
);

const Circle = dynamic(
    () => import('react-leaflet').then((mod) => mod.Circle),
    { ssr: false }
);

const Marker = dynamic(
    () => import('react-leaflet').then((mod) => mod.Marker),
    { ssr: false }
);

// Import types
import type { LatLngBounds, LatLngLiteral } from 'leaflet';

// Import custom marker icon
import mapMarkerIcon from './map-marker.png';

// Fix for default marker icon in Next.js
let L: any;
let DefaultIcon: any;

if (typeof window !== 'undefined') {
    L = require('leaflet');

    DefaultIcon = L.icon({
        iconUrl: mapMarkerIcon.src || mapMarkerIcon,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
        popupAnchor: [0, -50]
    });

    L.Marker.prototype.options.icon = DefaultIcon;
}

const minZoomLevel = 3;
const maxZoomLevel = 17;

interface TickMapLocationPickerProps extends CommonResponseComponentProps { }

interface DraggableMarkerProps {
    position?: LatLngLiteral;
    onPosChanged: (pos: LatLngLiteral) => void;
    onZoomChanged: (zoomLevel: number) => void;
    onBoundsChanged: (bounds: LatLngBounds) => void;
}

interface MapEventsComponentProps {
    onPosChanged: (pos: LatLngLiteral) => void;
    onZoomChanged: (zoomLevel: number) => void;
    onBoundsChanged: (bounds: LatLngBounds) => void;
    onPositionUpdate: (pos: LatLngLiteral) => void;
}

// Move MapEventsComponent outside DraggableMarker to prevent re-creation on each render
const MapEventsComponent: React.FC<MapEventsComponentProps> = (props) => {
    // Import useMapEvents hook dynamically
    const { useMapEvents } = require('react-leaflet');

    const map = useMapEvents({
        resize() {
            props.onBoundsChanged(map.getBounds());
        },
        moveend() {
            props.onBoundsChanged(map.getBounds());
        },
        zoomend(e: any) {
            props.onZoomChanged(e.target._zoom);
            props.onBoundsChanged(map.getBounds());
        },
        click(e: any) {
            props.onBoundsChanged(map.getBounds());
            const newPos = e.latlng;
            if (newPos === undefined) {
                return;
            }
            props.onPosChanged(newPos);
            props.onPositionUpdate(newPos);
        },
        locationfound(e: any) {
            const newPos = e.latlng;
            props.onPosChanged(newPos);
            props.onPositionUpdate(newPos);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    useEffect(() => {
        map.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank">Leaflet</a>');
    }, [map]);

    return null;
};

const DraggableMarker: React.FC<DraggableMarkerProps> = (props) => {
    const [position, setPosition] = useState(props.position);
    const markerRef = useRef<any>(null);

    const eventHandlers = useMemo(
        () => ({
            drag() {
                const marker = markerRef.current;
                if (marker != null) {
                    const newPos = marker.getLatLng();
                    props.onPosChanged(newPos);
                    setPosition(newPos);
                }
            },
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    const newPos = marker.getLatLng();
                    props.onPosChanged(newPos);
                    setPosition(newPos);
                }
            },
        }),
        [props]
    );

    useEffect(() => {
        setPosition(props.position);
    }, [props.position]);

    return (
        <>
            <MapEventsComponent
                onPosChanged={props.onPosChanged}
                onZoomChanged={props.onZoomChanged}
                onBoundsChanged={props.onBoundsChanged}
                onPositionUpdate={setPosition}
            />
            {position && (
                <Marker
                    draggable={true}
                    eventHandlers={eventHandlers}
                    position={position}
                    ref={markerRef}
                />
            )}
        </>
    );
};

const defaultCenter: LatLngLiteral = {
    lat: 52.2129919,
    lng: 5.2793703
};

const markerConfidenceCircleScaleFactor = 4041200;

const TickMapLocationPicker: React.FC<TickMapLocationPickerProps> = (props) => {
    const [response, setResponse] = useState<ResponseItem | undefined>(props.prefill);
    const [touched, setTouched] = useState(false);
    const [markerPosition, setMarkerPosition] = useState<LatLngLiteral | undefined>();
    const [currentBounds, setCurrentBounds] = useState<LatLngBounds>();
    const [currentZoomLevel, setCurrentZoomLevel] = useState(7);
    const [lastUsedZoomLevel, setLastUsedZoomLevel] = useState(currentZoomLevel);
    const [isMounted, setIsMounted] = useState(false);
    const lastEmittedResponseJsonRef = useRef<string | null>(null);

    const mapTileURL = process.env.NEXT_PUBLIC_MAP_TILE_URL || "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

    // Initialize from prefill
    useEffect(() => {
        if (props.prefill?.items) {
            const latItem = props.prefill.items.find(item => item.key === 'lat');
            const lngItem = props.prefill.items.find(item => item.key === 'lng');
            const zoomItem = props.prefill.items.find(item => item.key === 'zoom');

            if (latItem?.value && lngItem?.value) {
                const lat = parseFloat(latItem.value);
                const lng = parseFloat(lngItem.value);
                if (!isNaN(lat) && !isNaN(lng)) {
                    setMarkerPosition({ lat, lng });
                }
            }

            if (zoomItem?.value) {
                const zoom = parseInt(zoomItem.value, 10);
                if (!isNaN(zoom)) {
                    setCurrentZoomLevel(zoom);
                    setLastUsedZoomLevel(zoom);
                }
            }
        }
        setIsMounted(true);
    }, [props.prefill]);

    // Debounce response changes
    useEffect(() => {
        if (!touched) {
            return;
        }

        // Avoid re-emitting the same response on unrelated re-renders
        const responseJson = JSON.stringify(response ?? null);
        if (lastEmittedResponseJsonRef.current === responseJson) {
            return;
        }

        const timer = setTimeout(() => {
            // Re-check at send time in case another update already emitted it
            const latestJson = JSON.stringify(response ?? null);
            if (lastEmittedResponseJsonRef.current === latestJson) {
                return;
            }
            lastEmittedResponseJsonRef.current = latestJson;
            props.responseChanged(response);
        }, 500);

        return () => clearTimeout(timer);
    }, [response, touched, props.responseChanged]);

    const onMarkerPositionChange = useEffectEvent((markerPosition: LatLngLiteral) => {
        if (!isMounted || !L) {
            return;
        }
        setLastUsedZoomLevel(currentZoomLevel);
        const wrappedPosition = new L.LatLng(markerPosition.lat, markerPosition.lng).wrap();

        const newResponse: ResponseItem = {
            key: props.compDef.key ? props.compDef.key : 'no key found',
            items: [
                { key: 'lat', value: wrappedPosition.lat.toString() },
                { key: 'lng', value: wrappedPosition.lng.toString() },
                { key: 'zoom', value: currentZoomLevel.toFixed(0) },
                { key: 'crs', value: "WGS-84" },
                {
                    key: 'bounds',
                    items: [
                        {
                            key: 'southWest',
                            items: [
                                { key: 'lat', value: currentBounds?.getSouthWest().wrap().lat.toString() || '' },
                                { key: 'lng', value: currentBounds?.getSouthWest().wrap().lng.toString() || '' },
                            ]
                        },
                        {
                            key: 'northEast',
                            items: [
                                { key: 'lat', value: currentBounds?.getNorthEast().wrap().lat.toString() || '' },
                                { key: 'lng', value: currentBounds?.getNorthEast().wrap().lng.toString() || '' },
                            ]
                        },
                    ]
                },
            ]
        };

        setTouched(true);
        setResponse(newResponse);
    })

    // Update response when marker position changes
    useEffect(() => {
        if (markerPosition === undefined) {
            return;
        }

        onMarkerPositionChange(markerPosition);
    }, [markerPosition, props.compDef.key, isMounted]);

    // Don't render map until mounted (client-side only)
    if (!isMounted) {
        return (
            <div className="px-[--survey-card-px-sm] @md:px-[--survey-card-px]">
                <p className="mb-4">{getLocaleStringTextByCode(props.compDef.content, props.languageCode)}</p>
                <div className="h-[425px] bg-muted animate-pulse rounded-md" />
            </div>
        );
    }

    return (
        <div className="px-[--survey-card-px-sm] @md:px-[--survey-card-px]">
            <p className="mb-4">{getLocaleStringTextByCode(props.compDef.content, props.languageCode)}</p>
            <div className="relative">
                <MapContainer
                    className="leaflet-container"
                    style={{
                        height: 425,
                        width: '100%',
                        zIndex: 0
                    }}
                    center={markerPosition || defaultCenter}
                    bounceAtZoomLimits={true}
                    zoom={currentZoomLevel}
                    minZoom={minZoomLevel}
                    maxZoom={maxZoomLevel}
                    doubleClickZoom={false}
                >
                    {markerPosition && (
                        <>
                            <Circle
                                center={markerPosition}
                                pathOptions={{
                                    color: '#565656',
                                    fill: false,
                                    dashArray: '5 5',
                                    weight: 2
                                }}
                                radius={markerConfidenceCircleScaleFactor / Math.pow(2, currentZoomLevel)}
                            />
                            <Circle
                                center={markerPosition}
                                pathOptions={{
                                    color: '#BC243A',
                                }}
                                radius={markerConfidenceCircleScaleFactor / Math.pow(2, lastUsedZoomLevel)}
                            />
                        </>
                    )}

                    <DraggableMarker
                        position={markerPosition}
                        onPosChanged={(pos) => {
                            setMarkerPosition(pos);
                        }}
                        onZoomChanged={(zoom) => setCurrentZoomLevel(zoom)}
                        onBoundsChanged={(bounds) => setCurrentBounds(bounds)}
                    />
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap contributors</a>'
                        url={mapTileURL}
                    />
                </MapContainer>
            </div>
        </div>
    );
};

export default TickMapLocationPicker;
