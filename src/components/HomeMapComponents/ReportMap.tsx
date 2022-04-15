import React, { useEffect, useState } from 'react';
import TRButton from '../TRButton';
import { CircleMarker, MapContainer, TileLayer, } from 'react-leaflet';

import { getExternalOrLocalContentURL, LoadingPlaceholder, Slider } from 'case-web-ui';
import { LatLngBounds } from 'leaflet';


interface ReportMapProps {
  onNavigate: (url: string) => void;
}


const maxZoomLevel = 12;
const defaultCenter = {
  lat: 52.2129919,
  lng: 5.2793703
};

const maxBounds = new LatLngBounds(
  {
    lat: 54,
    lng: 3
  },
  {
    lat: 50,
    lng: 8
  }
)

interface ReportMapSeries {
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

const ReportMap: React.FC<ReportMapProps> = (props) => {
  const [selectedSeries, setSelectedSeries] = useState<undefined | number>();
  const [reportData, setReportData] = useState<ReportMapSeries | undefined>()

  const mapTileURL = process.env.REACT_APP_MAP_TILE_URL ? process.env.REACT_APP_MAP_TILE_URL : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  useEffect(() => {
    if (reportData) {
      setSelectedSeries(reportData.slider.labels.length - 1);
    }
  }, [reportData])

  useEffect(() => {
    fetch(getExternalOrLocalContentURL('/data/maps/tb_report_map_data_MH_v2.json'))
      .then(res => res.json())
      .then(json => {
        setReportData(json);
      })
      .catch(error => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (reportData === undefined) {
    return <LoadingPlaceholder color="secondary" minHeight={400} />
  }

  const breakpoint = 'md'
  return (<div className="p-2">
    <div className="row">
      <div className={`col-12 col-${breakpoint}-7`}>
        <MapContainer
          className="leaflet"
          style={{
            minHeight: 500,
            height: '100%',
          }}
          center={defaultCenter}
          bounceAtZoomLimits={true}
          zoom={7}
          minZoom={7}
          maxBounds={maxBounds}
          maxZoom={maxZoomLevel}
          doubleClickZoom={false}
          scrollWheelZoom={false}
        >
          {
            (selectedSeries !== undefined && reportData !== undefined) ? reportData.series[selectedSeries].map(
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
            attribution='<a href="http://osm.org/copyright">&copy; OpenStreetMap contributors</a>'
            url={mapTileURL}
          /// url="https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/grijs/EPSG:28992/{z}/{x}/{y}.png"
          //url="https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/standaard/EPSG:3857/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
      <div className={`col-12 col-${breakpoint}-5`}>
        <div className={`mt-2 mt-${breakpoint}-0`} >
          <h3>Tekenmeldingen</h3>
          <p>Overzicht van de meldingen van tekenbeten, <a href="/informatie/erythema-migrans">erythema migrans </a> en overige Lyme in de afgelopen vier weken.</p>
          <p>De kaart toont alleen de meldingen binnen Nederland, met maximaal enkele dagen vertraging.</p>

          {
            (selectedSeries !== undefined && reportData !== undefined) ? <div className="text-center w-100 justify-content-center">
              <div className="px-3 pb-0 mb-0">
                <div className="w-100 text-center text-primary fw-bold">
                  {reportData.slider.labels[selectedSeries]}
                </div>
                <Slider
                  id="mapSlider"
                  min={0}
                  trackColor='white'

                  max={reportData.slider.labels.length - 1}
                  step={1}
                  value={selectedSeries}
                  onChange={(value) => {
                    setSelectedSeries(value ? value : 0);
                  }}
                />
                <div className="d-flex">
                  <span className="flex-grow-1 text-start">
                    {reportData.slider.minLabel}
                  </span>
                  <span className="">
                    {reportData.slider.maxLabel}
                  </span>
                </div>
              </div>
            </div> : null
          }


          <TRButton
            className='my-2'
            label={'Zelf melden'}
            onClick={() => props.onNavigate('/melden')}
          />

          <div className="">
            <h6 className="fw-bold">Legenda tekenmeldingen</h6>

            <div className='d-flex align-items-center mb-1'>
              <LegendMarker color={getMarkerColor('TB')} /> Tekenbeet
            </div>
            <div className='d-flex align-items-center mb-1'>
              <LegendMarker color={getMarkerColor('EM')} />
              Erythema migrans (rode ring of vlek)</div>
            <div className='d-flex align-items-center mb-1'>
              <LegendMarker color={getMarkerColor('Other')} />
              Andere vorm van de ziekte van Lyme
            </div>
            <div className='d-flex align-items-center'>
              <LegendMarker color={getMarkerColor('FE')} /> Koorts na tekenbeet</div>
          </div>

        </div>
      </div>
    </div>
  </div >
  );
};

export default ReportMap;

