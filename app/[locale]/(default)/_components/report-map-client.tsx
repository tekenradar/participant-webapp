"use client";

import SimpleLoader from '@/components/simple-loader';
import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';
import EmbeddedMarkdownRenderer from '@/components/embedded-markdown-renderer';
import { MeldenButton } from '@/components/report-card';
import { Slider } from './custom-slider';

// Dynamically import Leaflet map components to avoid SSR issues
const MapContainer = dynamic(
    () => import('react-leaflet').then((mod) => mod.MapContainer),
    { ssr: false }
);

const TileLayer = dynamic(
    () => import('react-leaflet').then((mod) => mod.TileLayer),
    { ssr: false }
);

const CircleMarker = dynamic(
    () => import('react-leaflet').then((mod) => mod.CircleMarker),
    { ssr: false }
);

const maxZoomLevel = 12;
const defaultCenter = {
    lat: 52.2129919,
    lng: 5.2793703
};

interface ReportMapClientProps {
    data: ReportMapSeries;
    mapTileURL: string;
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


export interface ReportMapSeries {
    slider: {
        minLabel: string;
        maxLabel: string;
        labels: string[];
    },
    series: Array<Array<ReportMapData>>;
}

interface ReportMapData {
    lat: number;
    lng: number;
    type: reportType;
}


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
    const [selectedSeries, setSelectedSeries] = useState<undefined | number>();
    const [reportData, setReportData] = useState<ReportMapSeries | undefined>()


    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (props.data !== undefined) {
            setReportData(props.data);
            if (props.data.series.length > 0) {
                setSelectedSeries(props.data.series.length - 1);
            } else {
                setSelectedSeries(undefined);
            }
        }
    }, [props.data]);

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
        return <SimpleLoader className="w-full h-full min-h-[500px] my-4" />;
    }

    return <div className='flex h-full flex-col sm:flex-row'>
        <div className='p-4 pb-0 grow flex flex-col flex-1 '>
            <div className='flex flex-col flex-1 relative min-h-[500px]'>
                <div className='absolute top-0 left-0 w-full h-full z-[1]'>
                    <SimpleLoader className="w-full h-full" />
                </div>
                <MapContainer
                    className="leaflet grow z-[2]"
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
                    {
                        (selectedSeries !== undefined && reportData !== undefined && reportData.series[selectedSeries] !== undefined) ? reportData.series[selectedSeries].map(
                            (data, index) => <CircleMarker
                                key={index.toString()}
                                center={data}
                                pathOptions={{
                                    color: getMarkerColor(data.type),
                                    fillOpacity: 0.66
                                }}
                                radius={10}
                            />
                        ) : null
                    }


                    <TileLayer
                        url={props.mapTileURL}
                    /// url="https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/grijs/EPSG:28992/{z}/{x}/{y}.png"
                    //url="https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/standaard/EPSG:3857/{z}/{x}/{y}.png"
                    />

                </MapContainer>
            </div>
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
                    <div className="text-center w-full">
                        <div className="w-full text-center text-primary font-bold">
                            {reportData?.slider.labels[selectedSeries ?? 0]}
                        </div>

                        <Slider
                            step={1}
                            min={0}
                            max={reportData?.series.length ? reportData.series.length - 1 : 0}
                            value={[selectedSeries ?? 0] as number[]}
                            onValueChange={(value) => {
                                setSelectedSeries(value ? value[0] as number : undefined);
                            }}
                        />

                        <div className="flex justify-between">
                            <span className='grow-1 text-start'>
                                {reportData?.slider.minLabel}
                            </span>
                            <span className="">
                                {reportData?.slider.maxLabel}
                            </span>
                        </div>
                    </div>
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