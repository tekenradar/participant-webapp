import { getExternalOrLocalContentURL } from 'case-web-ui';
import React from 'react';
import { GenericPageItemProps } from './utils';

interface PartnersProps extends GenericPageItemProps {
}

const imageClassName = 'mx-2 mb-2'

const Partners: React.FC<PartnersProps> = (props) => {
  return (
    <div>
      <h2 className="border-top-2 border-primary text-start"><b>Partners</b></h2>
      <div className="d-flex justify-content-center align-items-center flex-wrap">
        <a
          className={imageClassName}
          href="/informatie/tekenradar" target="_blank" rel="noreferrer">
          <img src={getExternalOrLocalContentURL("/images/logo-rivm.jpeg")} alt="Logo Rijksinstituut voor Volksgezondheid en Milieu (RIVM)"
            width={280}
            className='mw-100'
          />
        </a>
        <a
          className={imageClassName}
          href="/informatie/tekenradar" target="_blank" rel="noreferrer">
          <img src={getExternalOrLocalContentURL("/images/logo-WUR.png")} alt="Logo Wageningen University and Research"
            width={240}
            className='mw-100'
          />
        </a>
        <a
          className={imageClassName}
          href="/informatie/tekenradar" target="_blank" rel="noreferrer">
          <img src={getExternalOrLocalContentURL("/images/logo-AMC.png")} alt="Logo Amsterdam Universitair Medische Centra"
            width={220}
            className='mw-100'
          />
        </a>
        <a
          className={imageClassName}
          href="/informatie/tekenradar" target="_blank" rel="noreferrer">
          <img src={getExternalOrLocalContentURL("/images/logo-FSD.png")} alt="Logo Stichting voor Duurzame Ontwikkeling"
            width={180}
            className='mw-100'
          />
        </a>
        <a
          className={imageClassName}
          href="/informatie/tekenradar" target="_blank" rel="noreferrer">
          <img src={getExternalOrLocalContentURL("/images/logo-radboudumc.png")} alt="Logo Radboud Universitair Medisch Centrum"
            width={220}
            className='mw-100'
          />
        </a>
      </div>
    </div>

  );
};

export default Partners;
