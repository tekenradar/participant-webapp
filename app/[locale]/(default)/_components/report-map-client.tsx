"use client";

import SimpleLoader from '@/components/simple-loader';
import type { LatLngBounds } from 'leaflet';
import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';

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

const maxZoomLevel = 12;
const defaultCenter = {
    lat: 52.2129919,
    lng: 5.2793703
};

const mapTileURL = process.env.NEXT_PUBLIC_MAP_TILE_URL || "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const ReportMapClient = () => {
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

    return <div className='flex h-full'>
        <div className='p-4 grow flex flex-col'>
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
        <div className='p-4 grow'>

        </div>
    </div >;
};

export default ReportMapClient;