import { CommonResponseComponentProps } from 'case-web-ui/build/components/survey/SurveySingleItemView/utils';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Circle, MapContainer, Marker, TileLayer, useMapEvents, } from 'react-leaflet';
import { LocalizedObject, LocalizedString, ResponseItem } from 'survey-engine/data_types';

import icon from './map-marker.png';

import { LatLngBounds, LatLngLiteral } from 'leaflet';


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
const maxZoomLevel = 17;

L.Marker.prototype.options.icon = DefaultIcon;

interface TickMapResponseProps extends CommonResponseComponentProps {
}


const getLocaleStringTextByCode = (translations: LocalizedObject[] | undefined, code: string): string | undefined => {
  if (!translations) { return; }
  const translation = (translations.find(cont => cont.code === code) as LocalizedString);
  if (!translation) {
    if (translations.length > 0) {
      return (translations[0] as LocalizedString).resolvedText;
    }
    return;
  }
  return translation.resolvedText;
}


interface DraggableMarkerProps {
  position?: LatLngLiteral;
  onPosChanged: (pos: LatLngLiteral) => void;
  onZoomChanged: (zoomLevel: number) => void;
  onBoundsChanged: (bounds: LatLngBounds) => void;
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
    resize(e: any) {
      props.onBoundsChanged(map.getBounds());
    },
    moveend(e: any) {
      props.onBoundsChanged(map.getBounds());
    },
    zoomend(e: any) {
      // console.log(e);
      props.onZoomChanged(e.target._zoom);
      props.onBoundsChanged(map.getBounds());
    },
    click(e: any) {
      props.onBoundsChanged(map.getBounds());
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
      // console.log(newPos);
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

const markerConfidenceCircleScaleFactor = 4041200;

const TickMapResponse: React.FC<TickMapResponseProps> = (props) => {
  const [response, setResponse] = useState<ResponseItem | undefined>(props.prefill);
  const [touched, setTouched] = useState(false);

  const [markerPosition, setMarkerPosition] = useState<LatLngLiteral | undefined>();
  const [currentBounds, setCurrentBounds] = useState<LatLngBounds>();
  const [currentZoomLevel, setCurrentZoomLevel] = useState(7);
  const [lastUsedZoomLevel, setLastUsedZoomLevel] = useState(currentZoomLevel);


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
    setLastUsedZoomLevel(currentZoomLevel);
    const newResponse = {
      key: props.compDef.key ? props.compDef.key : 'no key found',
      items: [
        { key: 'lat', value: markerPosition.lat.toString() },
        { key: 'lng', value: markerPosition.lng.toString() },
        { key: 'zoom', value: currentZoomLevel.toFixed(0) },
        { key: 'crs', value: "WGS-84" },
        {
          key: 'bounds', items: [
            {
              key: 'southWest', items: [
                { key: 'lat', value: currentBounds?.getSouthWest().lat.toString() },
                { key: 'lng', value: currentBounds?.getSouthWest().lng.toString() },
              ]
            },
            {
              key: 'northEast', items: [
                { key: 'lat', value: currentBounds?.getNorthEast().lat.toString() },
                { key: 'lng', value: currentBounds?.getNorthEast().lng.toString() },
              ]
            },
          ]
        },
      ]
    }
    // console.log(newResponse)
    setTouched(true);
    setResponse(newResponse);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markerPosition])


  return (
    <div>
      <p>{getLocaleStringTextByCode(props.compDef.content, props.languageCode)}</p>
      <MapContainer
        className="leaflet"
        style={{
          height: 425
        }}
        center={defaultCenter}
        bounceAtZoomLimits={true}
        zoom={currentZoomLevel}
        minZoom={5}
        maxZoom={maxZoomLevel}
        doubleClickZoom={false}
      //scrollWheelZoom={false}
      >
        {markerPosition ?
          <Circle
            center={markerPosition}
            pathOptions={{
              color: '#565656',
              fill: false,
              dashArray: '5 5',
              weight: 2
            }}
            // stroke={false}
            radius={markerConfidenceCircleScaleFactor / Math.pow(2, currentZoomLevel)}
          >

          </Circle>
          : null}
        {markerPosition ?
          <Circle
            center={markerPosition}
            pathOptions={{
              color: '#BC243A',
              //stroke: false
            }}
            radius={markerConfidenceCircleScaleFactor / Math.pow(2, lastUsedZoomLevel)}
          >
          </Circle>
          : null}


        <DraggableMarker
          position={markerPosition}
          onPosChanged={(pos) => {
            setMarkerPosition(pos)
          }}
          onZoomChanged={(zoom) => setCurrentZoomLevel(zoom)}
          onBoundsChanged={(bounds) => setCurrentBounds(bounds)}
        />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap contributors</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        //url="https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/standaard/EPSG:3857/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div >
  );
};

export default TickMapResponse;
