import { CommonResponseComponentProps } from 'case-web-ui/build/components/survey/SurveySingleItemView/utils';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CircleMarker, MapContainer, Marker, TileLayer, useMapEvents, } from 'react-leaflet';
import { ResponseItem } from 'survey-engine/data_types';

import 'proj4leaflet';

// import icon from 'leaflet/dist/images/marker-icon.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import icon from './map-marker.png';

import { LatLngLiteral } from 'leaflet';


var L = require('leaflet');

let DefaultIcon = L.icon({
  iconUrl: icon,
  iconSize: [48, 48],
  //shadowUrl: iconShadow,
  //iconAnchor: [12, 35], // point of the icon which will correspond to marker's location
  iconAnchor: [24, 24], // point of the icon which will correspond to marker's location
  // shadowAnchor: [12, 35],  // the same for the shadow
  popupAnchor: [0, -50] // point from which the popup should open relative to the iconAnchor

});

L.Marker.prototype.options.icon = DefaultIcon;

interface TickMapResponseProps extends CommonResponseComponentProps {
}

interface DraggableMarkerProps {
  position?: LatLngLiteral;
  onPosChanged: (pos: LatLngLiteral) => void;
  onZoomChanged: (zoomLevel: number) => void;
}

const DraggableMarker: React.FC<DraggableMarkerProps> = (props) => {
  const [position, setPosition] = useState(props.position)
  const markerRef = useRef<any>(null)


  const eventHandlers = useMemo(
    () => ({
      drag() {
        const marker = markerRef.current
        if (marker != null) {
          const newPos = marker.getLatLng();
          // console.log(newPos);
          props.onPosChanged(newPos);
          setPosition(newPos)
        }
      },
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          const newPos = marker.getLatLng();
          // console.log(newPos);
          props.onPosChanged(newPos);
          setPosition(newPos)
        }
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const map = useMapEvents({
    zoomend(e: any) {
      // console.log(e);
      props.onZoomChanged(e.target._zoom);
    },
    click(e: any) {
      const newPos = e.latlng;
      if (newPos === undefined) {
        return;
      }
      // console.log(newPos);
      props.onPosChanged(newPos);
      setPosition(newPos)
    },
    locationfound(e: any) {
      const newPos = e.latlng;
      console.log(newPos);
      props.onPosChanged(newPos);
      setPosition(newPos)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  useEffect(() => {
    setPosition(props.position)
  }, [props.position])

  if (position === undefined) {
    return null;
  }

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}>
    </Marker>
  )
}

const defaultCenter = {
  lat: 52.2129919,
  lng: 5.2793703
};

const TickMapResponse: React.FC<TickMapResponseProps> = (props) => {
  const [response, setResponse] = useState<ResponseItem | undefined>(props.prefill);
  const [touched, setTouched] = useState(false);

  const [markerPosition, setMarkerPosition] = useState<LatLngLiteral | undefined>();
  const [currentZoomLevel, setCurrentZoomLevel] = useState(4);


  useEffect(() => {
    if (touched) {
      const timer = setTimeout(() => {
        props.responseChanged(response);
      }, 500);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  useEffect(() => {
    if (markerPosition === undefined) {
      return;
    }
    const newResponse = {
      key: props.compDef.key ? props.compDef.key : 'no key found',
      items: [
        { key: 'lat', value: markerPosition.lat.toString() },
        { key: 'lng', value: markerPosition.lng.toString() },
        { key: 'zoom', value: currentZoomLevel.toFixed(0) },
      ]
    }
    // console.log(newResponse)
    setTouched(true);
    setResponse(newResponse);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markerPosition])


  return (
    <div>
      <p>Klik op de kaart om (ongeveer) de locatie aan te geven waar u de tekenbeet heeft opgelopen.</p>
      <MapContainer
        className="leaflet"
        style={{
          height: 425
        }}
        center={defaultCenter}
        bounceAtZoomLimits={true}
        zoom={currentZoomLevel}
        minZoom={3}
        maxZoom={13}
        doubleClickZoom={false}
        //scrollWheelZoom={false}
        crs={new L.Proj.CRS('EPSG:28992', '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs',
          {
            transformation: L.Transformation(-1, -1, 0, 0),
            resolutions: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420],
            origin: [-285401.920, 903401.920],
            bounds: L.bounds([-285401.920, 903401.920], [595401.920, 22598.080])
          }
        )}

      >
        {markerPosition ?
          <CircleMarker
            center={markerPosition}
            pathOptions={{
              color: '#BC243A'
            }}
            radius={50}>
          </CircleMarker>
          : null}

        <DraggableMarker
          position={markerPosition}
          onPosChanged={(pos) => {
            setMarkerPosition(pos)
          }}
          onZoomChanged={(zoom) => setCurrentZoomLevel(zoom)}
        />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/standaard/EPSG:28992/{z}/{x}/{y}.png"
        //url="https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/standaard/EPSG:3857/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default TickMapResponse;
