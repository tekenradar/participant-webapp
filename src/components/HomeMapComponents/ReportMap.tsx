import React, { useEffect, useState } from 'react';
import { Placeholder } from 'react-bootstrap';
import TRButton from '../TRButton';
import { Circle, CircleMarker, MapContainer, Marker, TileLayer, useMapEvents, } from 'react-leaflet';
import { LocalizedObject, LocalizedString, ResponseItem } from 'survey-engine/data_types';

import 'proj4leaflet';

// import icon from 'leaflet/dist/images/marker-icon.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import icon from './map-marker.png';

import { LatLngBounds, LatLngLiteral } from 'leaflet';
import { Slider } from 'case-web-ui';


var L = require('leaflet');


interface ReportMapProps {
  onNavigate: (url: string) => void;
}


const maxZoomLevel = 6;
const defaultCenter = {
  lat: 52.2129919,
  lng: 5.2793703
};

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
    backgroundColor: props.color + '42',
    borderRadius: '50%',
    border: 'solid 3px ' + props.color,
    display: 'inline-block'
  }}>
  </span>
}

const ReportMap: React.FC<ReportMapProps> = (props) => {
  const [selectedSeries, setSelectedSeries] = useState<undefined | number>();
  const [reportData, setReportData] = useState<ReportMapSeries>({
    slider: {
      minLabel: '-4 weken',
      maxLabel: 'nu',
      labels: [
        '07.02.2022 - 13.02.2022',
        '14.02.2022 - 20.02.2022',
        '21.02.2022 - 27.02.2022',
        '28.02.2022 - 06.03.2022',
      ]
    },
    series: [
      [
        { "lat": 51.91, "lng": 4.44, type: "EM" },
        { "lat": 52.59, "lng": 5.61, type: "TB" },
        { "lat": 52.83, "lng": 5.96, type: "FE" },
      ],
      [
        { "lat": 52.11, "lng": 4.44, type: "EM" },
        { "lat": 51.59, "lng": 4.41, type: "TB" },
        { "lat": 51.83, "lng": 4.96, type: "FE" },
      ],
      [
        { "lat": 52.51, "lng": 4.84, type: "EM" },
        { "lat": 52.39, "lng": 4.61, type: "TB" },
        { "lat": 52.23, "lng": 4.96, type: "FE" },
      ],
      [{
        lat: defaultCenter.lat,
        lng: defaultCenter.lng,
        type: 'EM'
      },
      { "lat": 52.11, "lng": 4.44, type: "EM" },
      { "lat": 51.59, "lng": 4.41, type: "TB" },
      { "lat": 51.83, "lng": 4.96, type: "FE" },
      { "lat": 52.31, "lng": 4.82, type: "Other" },
      { "lat": 52.33, "lng": 5.83, type: "EM" },
      { "lat": 52.38, "lng": 5.6, type: "EM" }
      ],
    ]
  })

  useEffect(() => {
    setSelectedSeries(reportData.slider.labels.length - 1);
  }, [reportData])

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
          zoom={3}
          minZoom={2}
          maxZoom={maxZoomLevel}
          doubleClickZoom={false}
          scrollWheelZoom={false}
          crs={new L.Proj.CRS('EPSG:28992', '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs',
            {
              transformation: L.Transformation(-1, -1, 0, 0),
              resolutions: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420],
              origin: [-285401.920, 903401.920],
              bounds: L.bounds([-285401.920, 903401.920], [595401.920, 22598.080])
            }
          )}

        >
          {
            selectedSeries !== undefined ? reportData.series[selectedSeries].map(
              (data, index) => <CircleMarker
                key={index.toString()}
                center={data}
                pathOptions={{
                  color: getMarkerColor(data.type),
                }}
                radius={10}
              />
            ) : null
          }


          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            url="https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/grijs/EPSG:28992/{z}/{x}/{y}.png"
          //url="https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/standaard/EPSG:3857/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
      <div className={`col-12 col-${breakpoint}-5`}>
        <div className={`mt-2 mt-${breakpoint}-0`} >
          <h3>Tekenmeldingen</h3>
          <p>Overzicht van de meldingen van tekenbeten en <a href="/informatie/erythema-migrans">erythema migrans </a>in de afgelopen vier weken.</p>
          <p>TODO: statement that only reports in the Netherlands are displayed over the map</p>

          {
            selectedSeries !== undefined ? <div className="text-center w-100 justify-content-center">
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
              Erythema migrans</div>
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
