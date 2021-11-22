import { getExternalOrLocalContentURL } from 'case-web-ui';
import React from 'react';
import { GenericPageItemProps } from './utils';

interface PartnersProps extends GenericPageItemProps {
}

const imageClassName = 'mx-2 mb-2'

const Partners: React.FC<PartnersProps> = (props) => {
  return (
    <div>
      <h3 className="border-top-2 border-primary text-start">Partners</h3>
      <div className="d-flex justify-content-center align-items-center flex-wrap">
        <a
          className={imageClassName}
          href="https://www.wur.nl/nl/wageningen-university.htm" target="_blank" rel="noreferrer">
          <img src={getExternalOrLocalContentURL("/images/logo-wageningen.gif")} alt="Logo Wageningen"
            width={300}
          />
        </a>
        <a
          className={imageClassName}
          href="https://rivm.nl" target="_blank" rel="noreferrer">
          <img src={getExternalOrLocalContentURL("/images/logo-rivm.jpeg")} alt="Logo RIVM"
            height={120}
          />
        </a>
        <a
          className={imageClassName}
          href="https://www.naturetoday.com/intl/nl/observations/natuurkalender?utm_source=natuurkalender.nl&utm_medium=redirect&utm_campaign=olddomain" target="_blank" rel="noreferrer">
          <img src={getExternalOrLocalContentURL("/images/logo-natuurkalender.png")} alt="Logo Natuurkalender"
            height={120}
          />
        </a>

      </div>
    </div>

  );
};

export default Partners;
