import React, { useState } from 'react';
import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Nav, Placeholder, Tab } from 'react-bootstrap';

interface ReportMapProps {
  // Generic:
  pageKey: string;
  itemKey: string;
  className?: string;
  // renderGenericItemFunc: (item: PageItem) => React.ReactElement | null
  // Custom
  label: string;
}

const getNavItemClassName = (isActive: boolean): string => {
  return clsx(
    'flex-grow-1 cursor-pointer',
    {
      "bg-primary": !isActive,
      "bg-secondary ": isActive,
    }
  );
}

const getNavLinkClassName = (isActive: boolean): string => {
  return clsx(
    "text-decoration-none",
    {
      "text-body fw-bold": isActive,
    }
  );
}

interface CustomNavItemProps {
  isActive: boolean;
  eventKey: string;
  label: string;
}

const CustomNavItem: React.FC<CustomNavItemProps> = (props) => {
  return <Nav.Item className={getNavItemClassName(props.isActive)}>
    <Nav.Link
      className={getNavLinkClassName(props.isActive)}
      eventKey={props.eventKey}>{props.label}</Nav.Link>
  </Nav.Item>
}

const TekenmeldingenTab: React.FC = () => {
  const breakpoint = 'lg'
  return <div className="p-2">
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
          <p>Overzicht van de meldingen van tekenbeten en erythema migrans in de afgelopen vier weken.</p>

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

        </div>

      </div>
    </div>
  </div >
}


const ReportMap: React.FC<ReportMapProps> = (props) => {
  // const { t, i18n } = useTranslation([props.pageKey]);
  const [key, setKey] = useState('tekenmeldingen');


  return (
    <div
      className="bg-secondary"
    >
      <Tab.Container id="kaarten"
        activeKey={key}
        onSelect={(k) => { if (k) { setKey(k) } }}
      >
        <Nav variant="pills" className="flex-column flex-sm-row">

          <CustomNavItem
            eventKey="tekenmeldingen"
            isActive={key === "tekenmeldingen"}
            label="Tekenmeldingen"
          />
          <CustomNavItem
            eventKey="othermap"
            isActive={key === "othermap"}
            label="Some other map"
          />
          <CustomNavItem
            eventKey="lymeinnl"
            isActive={key === "lymeinnl"}
            label="Lyme in Nederland"
          />
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="tekenmeldingen">
            <TekenmeldingenTab />
          </Tab.Pane>
          <Tab.Pane eventKey="othermap">
            <div className="p-2">
              <div className="row">
                <div className="col-7">
                  <div
                    className={clsx(
                      "d-flex justify-content-center align-items-center bg-grey-5",
                    )}
                    style={{
                      height: 425
                    }}
                  >
                    <h1 className="fs-1 text-center text-white text-uppercase m-0 p-2">MAP</h1>
                  </div>
                </div>
                <div className="col-5">
                </div>
              </div>
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="lymeinnl">
            <div className="p-2">
              <div className="row">
                <div className="col-7">
                  <div
                    className={clsx(
                      "d-flex justify-content-center align-items-center bg-grey-5",
                    )}
                    style={{
                      height: 425
                    }}
                  >
                    <h1 className="fs-1 text-center text-white text-uppercase m-0 p-2">MAP</h1>
                  </div>
                </div>
                <div className="col-5">
                </div>
              </div>
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>

    </div>
  );
};

export default ReportMap;

