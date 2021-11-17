import React from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer } from 'react-leaflet';

interface ReportMapProps {
  // Generic:
  pageKey: string;
  itemKey: string;
  className?: string;
  // renderGenericItemFunc: (item: PageItem) => React.ReactElement | null
  // Custom
  label: string;
}

const ReportMap: React.FC<ReportMapProps> = (props) => {
  const { t, i18n } = useTranslation([props.pageKey]);

  const mapTypes = ['Tekenmeldingen', 'Tekenverwachting']

  /*
  <h1 className="fs-1 text-center text-primary text-uppercase m-0 p-2">{props.label}</h1>
      <p>{t(`${props.itemKey}`)}</p>
      */
  return (
    <div
      className={clsx(
        // "d-flex justify-content-center align-items-center bg-grey-4"
      )}
    >
      <nav aria-label="plot selection">
        <ul className="pagination justify-content-center d-block d-sm-flex">
          {mapTypes.map(dt =>
            <li key={dt}
              role="button"
              className={clsx(
                "page-item",
                { 'active': dt === 'Tekenmeldingen' })}
            //onClick={() => setSelectedSeries(dt)}
            >
              <span className="page-link">{dt}</span>
            </li>
          )}
        </ul>
      </nav>
      <h3>Tekenmeldungen</h3>
      <p>Overzicht van de meldingen van tekenbeten en erythema migrans(?) in de afgelopen vier weken.</p>

      <div>
        <MapContainer
          className="leaflet"
          style={{
            height: 450
          }}
          center={[52.2129919, 5.2793703]}
          zoom={2}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/standaard/EPSG:28992/{z}/{x}/{y}.png"
          //url="https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/standaard/EPSG:3857/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default ReportMap;

