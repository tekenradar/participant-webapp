import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Placeholder } from 'react-bootstrap';


interface ReportMapProps {
  onNavigate: (url: string) => void;
}

const ReportMap: React.FC<ReportMapProps> = (props) => {
  const breakpoint = 'lg'
  return (<div className="p-2">
    <div className="row">
      <div className={`col-12 col-${breakpoint}-7`}>
        <MapContainer
          className="leaflet"
          style={{
            height: 425
          }}
          center={[10.0029919, 5.2793703]}
          zoom={3}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            url="https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/standaard/EPSG:28992/{z}/{x}/{y}.png"
          //url="https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/standaard/EPSG:3857/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
      <div className={`col-12 col-${breakpoint}-5`}>
        <div className={`mt-2 mt-${breakpoint}-0`} >
          <h3>Tekenmeldingen</h3>
          <p>Overzicht van de meldingen van tekenbeten en <a href="/informatie/erythema-migrans">erythema migrans </a>in de afgelopen vier weken.</p>
          <p>TODO: statement that only reports in the Netherlands are displayed over the map</p>
          <div className="text-center">
            <Placeholder xs={6} />
          </div>

          <Placeholder xs={12} size="lg" />

          <div className="mt-4">
            <h6 className="fw-bold">Legend</h6>
            <Placeholder xs={6} />
            <Placeholder xs={7} />
            <Placeholder xs={9} />
            <Placeholder xs={5} />
          </div>

          <button
            className="btn btn-tekenradar mt-2 w-100 text-start fs-btn fw-bold"
            onClick={() => {
              props.onNavigate('/melden');
            }}
          >

            {'Zelf melden'}
            <span>
              &nbsp;
              <i
              //</button>className="fs-btn fw-bold"
              >
                <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-arrow-right-short" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
                </svg>
              </i>
            </span>

          </button>

        </div>

      </div>
    </div>
  </div >
  );
};

export default ReportMap;

