"use client";

import SimpleLoader from '@/components/simple-loader';
import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';
import EmbeddedMarkdownRenderer from '@/components/embedded-markdown-renderer';
import { MeldenButton } from '@/components/report-card';

// Dynamically import Leaflet map components to avoid SSR issues
const MapContainer = dynamic(
    () => import('react-leaflet').then((mod) => mod.MapContainer),
    { ssr: false }
);

const TileLayer = dynamic(
    () => import('react-leaflet').then((mod) => mod.TileLayer),
    { ssr: false }
);

const maxZoomLevel = 12;
const defaultCenter = {
    lat: 52.2129919,
    lng: 5.2793703
};

const mapTileURL = process.env.NEXT_PUBLIC_MAP_TILE_URL || "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

interface ReportMapClientProps {
    messages: {
        title: string;
        description: string;
        meldenButtonLabel: string;
        legend: {
            title: string;
            TB: string;
            EM: string;
            Other: string;
            FE: string;
        }
    }
}

type reportType = 'TB' | 'EM' | 'FE' | 'Other';

const getMarkerColor = (type: reportType): string => {
    switch (type) {
        case 'TB':
            return '#497722';
        case 'EM':
            return '#BC243A';
        case 'Other':
            return '#285aa5';
        case 'FE':
            return '#FD9244';
        default:
            return '#213548'
    }
}

interface LegendMarkerProps {
    color: string;
}

const LegendMarker: React.FC<LegendMarkerProps> = (props) => {
    return <span style={{
        marginRight: 10,
        height: 22,
        width: 22,
        minWidth: 22,
        backgroundColor: props.color + 'A8',
        borderRadius: '50%',
        border: 'solid 3px ' + props.color,
        display: 'inline-block'
    }}>
    </span>
}


const ReportMapClient = (props: ReportMapClientProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const maxBounds = useMemo(() => {
        if (!mounted || typeof window === 'undefined') return null;
        const L = require('leaflet');
        return new L.LatLngBounds(
            {
                lat: 54,
                lng: 3
            },
            {
                lat: 50,
                lng: 8
            }
        );
    }, [mounted]);

    if (!mounted || !maxBounds) {
        return <SimpleLoader className="w-full h-full" />;
    }

    return <div className='flex h-full flex-col sm:flex-row'>
        <div className='p-4 pb-0 grow flex flex-col flex-1'>
            <MapContainer
                className="leaflet grow"
                style={{
                    minHeight: 500,
                }}
                center={defaultCenter}
                bounceAtZoomLimits={true}
                attributionControl={false}
                zoom={7}
                minZoom={7}
                maxBounds={maxBounds}
                maxZoom={maxZoomLevel}
                doubleClickZoom={false}
                scrollWheelZoom={false}
            >

                <TileLayer
                    url={mapTileURL}
                /// url="https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/grijs/EPSG:28992/{z}/{x}/{y}.png"
                //url="https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/standaard/EPSG:3857/{z}/{x}/{y}.png"
                />

            </MapContainer>
            <div>
                <p className='text-xs text-muted-foreground text-end py-0.5 space-x-1'>
                    <a
                        target='_blank' rel='noopener noreferrer'
                        className='hover:underline focus:outline-none focus:ring-0 focus:ring-offset-0 text-blue-600'
                        href="https://leafletjs.com">Leaflet</a>
                    <span>|</span>
                    <a
                        target='_blank' rel='noopener noreferrer'
                        className='hover:underline focus:outline-none focus:ring-0 focus:ring-offset-0 text-blue-600'
                        href="https://osm.org/copyright">&copy; OpenStreetMap contributors</a>
                </p>
            </div>
        </div >
        <div className='p-4 pt-0 sm:pt-4 sm:pl-0 sm:w-5/12'>
            <div>
                <h2 className='text-lg font-bold'>{props.messages.title}</h2>
                <EmbeddedMarkdownRenderer className='text-sm'>
                    {props.messages.description}
                </EmbeddedMarkdownRenderer>
                <div className='my-4'>
                    slider
                </div>

                <MeldenButton label={props.messages.meldenButtonLabel} href='/melden' />

                <div className="text-sm mt-4 space-y-2">
                    <h6 className="font-bold">{props.messages.legend.title}</h6>

                    <div className='flex items-center mb-1'>
                        <LegendMarker color={getMarkerColor('TB')} /> {props.messages.legend.TB}
                    </div>
                    <div className='flex items-center mb-1'>
                        <LegendMarker color={getMarkerColor('EM')} />
                        {props.messages.legend.EM}</div>
                    <div className='flex items-center mb-1'>
                        <LegendMarker color={getMarkerColor('Other')} />
                        {props.messages.legend.Other}
                    </div>
                    <div className='flex items-center'>
                        <LegendMarker color={getMarkerColor('FE')} /> {props.messages.legend.FE}</div>
                </div>
            </div>

        </div>
    </div >;
};

export default ReportMapClient;