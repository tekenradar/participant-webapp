import { PageColumn, PageItem, PageRow } from 'case-web-app-core/build/types/pagesConfig';
import { ActionCard } from 'case-web-ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { GenericPageItemProps } from './utils';


interface InfoPageSectionProps extends GenericPageItemProps {
  rows: PageRow[];
}

const InfoPageSection: React.FC<InfoPageSectionProps> = (props) => {
  const { t, } = useTranslation([props.pageKey, 'global']);

  return (
    <div className="border-top-4 border-primary pt-1">
      <h2 className="fw-bold">
        {t(`${props.itemKey}.title`)}
      </h2>
    </div>


  );
};

export default InfoPageSection;

/*
 <div className="col-12 col-sm-4">
        <img src="/assets/images/tekenbeeten-km.png" height="250" />
      </div>
      <div className="col-12 col-sm-4">
        <ActionCard
          title="Tekenverwachting"
          className="h-100"
          image={{
            url: "/assets/images/no-license/tekenCard.jpg",
            placement: 'top',
            height: '150px',
          }}
          actionBtnText="Lees meer"
        >
          <p>...</p>
        </ActionCard>
      </div>
      <div className="col-12 col-sm-4">
        <ActionCard
          title="Pandora"

          actionBtnText="Lees meer"
        >
          <p>...</p>
        </ActionCard>
        <ActionCard
          className="mt-2"
          title="Results"
          actionBtnText="Lees meer"
        >
          <p>Informations about previous study results from the last 10 years.</p>
        </ActionCard>
      </div>
*/
