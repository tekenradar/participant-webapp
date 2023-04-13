import React, { useState } from 'react';
import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
import { Nav, Tab } from 'react-bootstrap';
import DensityMap from './HomeMapComponents/DensityMap';
import ReportMap from './HomeMapComponents/ReportMap';
import { GenericPageItemProps } from './utils';
import LymeMap from './HomeMapComponents/LymeMap';

interface ResultsTabsProps extends GenericPageItemProps {
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
    "text-center text-decoration-none",
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
      eventKey={props.eventKey}>{props.label}
    </Nav.Link>
  </Nav.Item>
}




const ResultsTabs: React.FC<ResultsTabsProps> = (props) => {
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
        <Nav
          as="ul"
          variant="pills"
          className="flex-column flex-sm-row"
          role="navigation"
        >
          <CustomNavItem
            eventKey="tekenmeldingen"
            isActive={key === "tekenmeldingen"}
            label="Tekenbeetmeldingen"
          />
          <CustomNavItem
            eventKey="dichtheidkaart"
            isActive={key === "dichtheidkaart"}
            label="Tekenbeetdichtheidtest"
          />
          <CustomNavItem
            eventKey="lymeinnl"
            isActive={key === "lymeinnl"}
            label="Lyme in Nederland"
          />
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="tekenmeldingen">
            <ReportMap
              onNavigate={(url: string) => props.onNavigate(url)}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="dichtheidkaart">
            <DensityMap />
          </Tab.Pane>
          <Tab.Pane eventKey="lymeinnl">
            <LymeMap
              language='nl'
            />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>

    </div>
  );
};

export default ResultsTabs;

