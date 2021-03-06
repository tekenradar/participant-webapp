import { getExternalOrLocalContentURL } from 'case-web-ui';
import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import TRButton from './TRButton';
import { GenericPageItemProps } from './utils';


interface ReportButtonCardProps extends GenericPageItemProps {
  imageBgPostion: string;
  imageBgSize: string;
  showMyTekenradarBtn?: boolean;
  buttons: Array<{ buttonKey: string, action: { type: 'navigate', value: string } }>;
}

const ReportButtonCard: React.FC<ReportButtonCardProps> = (props) => {
  const { t, } = useTranslation([props.pageKey, 'global']);


  const imageSrc = t(`${props.itemKey}.imageSrc`);
  const imageBgPosition = t(`${props.itemKey}.imageBgPosition`);
  const imageBgSize = t(`${props.itemKey}.imageBgSize`);

  return (
    <div
      className={clsx(
        'card border-0 bg-secondary',

        props.className
      )}
    >
      <div style={{
        height: 200,
        backgroundImage: `url(${getExternalOrLocalContentURL(imageSrc)})`,
        backgroundPosition: imageBgPosition,
        backgroundSize: imageBgSize,
      }}>
      </div>
      {/*imageSrc ? <img className="w-100" src={getExternalOrLocalContentURL(imageSrc)} alt={imageAlt} /> : undefined*/}
      <div className="p-2 pt-0">

        {props.showMyTekenradarBtn ? <React.Fragment><button
          key={'myTekenradarBtn'}
          className="btn btn-primary mt-2 w-100 text-start fs-4 fw-bold"
          onClick={() => {
            props.onNavigate('/my-tekenradar');

          }}
        >

          {t(`${props.itemKey}.myTekenradar`)}
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
        </React.Fragment> : null}

        {props.buttons.map(item =>
          <TRButton
            key={item.buttonKey}
            className="mt-2"
            label={t(`${props.itemKey}.${item.buttonKey}`)}
            onClick={() => {
              if (item.action.type === "navigate") {
                props.onNavigate(item.action.value);
              }
            }}
          />
        )}

        <div>
          <button
            className='btn btn-link mt-2 fw-bold py-1'
            role="navigation"
            onClick={() => {
              props.onNavigate('/informatie/hoe-verwijder-ik-een-teek');
            }}
          >Hoe verwijder ik een teek?</button>
        </div>

        <div>
          <button
            className='btn btn-link mt-0 text-start fw-bold py-1'
            role="navigation"
            onClick={() => {
              props.onNavigate('/informatie/erythema-migrans');
            }}
          >Voorbeelden van een rode ring of vlek</button>
        </div>

        <div>
          <button
            className='btn btn-link mt-0 text-start fw-bold py-1'
            role="navigation"
            onClick={() => {
              props.onNavigate('/onderzoek/vragenlijst');
            }}
          >Informatie elke week tekenbeten melden</button>
        </div>

      </div>
    </div>
  );
};

export default ReportButtonCard;
