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
          href="https://rivm.nl" target="_blank" rel="noreferrer">
          <img src={getExternalOrLocalContentURL("/images/logo-rivm.jpeg")} alt="Logo RIVM"
            width={380}
            className='mw-100'
          />
        </a>
        <a
          className={imageClassName}
          href="https://www.wur.nl/nl/wageningen-university.htm" target="_blank" rel="noreferrer">
          <img src={getExternalOrLocalContentURL("/images/logo-WUR.png")} alt="Logo Wageningen"
            width={380}
            className='mw-100'
          />
        </a>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-wrap">
        <a
          className={imageClassName}
          href="" target="_blank" rel="noreferrer">
          <img src={getExternalOrLocalContentURL("/images/logo-AMC.png")} alt="Logo AMC"
            width={320}
            className='mw-100'
          />
        </a>
        <a
          className={imageClassName}
          href="https://www.fsd.nl/" target="_blank" rel="noreferrer">
          <img src={getExternalOrLocalContentURL("/images/logo-FSD.png")} alt="Logo FSD"
            width={320}
            className='mw-100'
          />
        </a>
        <a
          className={imageClassName}
          href="https://www.radboudumc.nl/patientenzorg" target="_blank" rel="noreferrer">
          <img src={getExternalOrLocalContentURL("/images/logo-radboudumc.png")} alt="Logo Radboudumc"
            width={320}
            className='mw-100'
          />
        </a>
      </div>
    </div>

  );
};

export default Partners;
