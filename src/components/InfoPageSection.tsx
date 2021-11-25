import { PageItem, PageRow } from 'case-web-app-core/build/types/pagesConfig';
import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { GenericPageItemProps } from './utils';


interface InfoPageSectionProps extends GenericPageItemProps {
  leadItems: PageItem[];
  panelRows: PageRow[];
  leadColClassName?: string;
}

const InfoPageSection: React.FC<InfoPageSectionProps> = (props) => {
  const { t, } = useTranslation([props.pageKey, 'global']);

  return (
    <div className="border-top-4 border-primary pt-1">
      <h2 className="fw-bold">
        {t(`${props.itemKey}.title`)}
      </h2>
      <div className="row gy-2a justify-content-center">
        <div className={clsx(
          props.leadColClassName,
          {
            [`col-12 col-sm-10 col-md-5 col-lg-4`]: !props.leadColClassName
          })}>
          {props.leadItems.map(item => props.renderGenericItemFunc(item))}
        </div>
        {props.panelRows.length > 0 ? <div className={`col-12 col-sm-10 col-md-7 col-lg-8`}>
          {props.panelRows.map((row, index) => <div
            className={clsx("row gy-2a",
              { "mb-2a": index < props.panelRows.length - 1 }
            )}
            key={row.key}>
            {row.columns.map((column, index) => <div className={column.className} key={column.key + index.toString()}>
              {column.items.map(item => props.renderGenericItemFunc(item))}
            </div>)}
          </div>)}
        </div> : null}
      </div>
      {/* additional rows? */}
    </div >
  );
};

export default InfoPageSection;
