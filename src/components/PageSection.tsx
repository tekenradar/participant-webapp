import { PageColumn, PageRow } from 'case-web-app-core/build/types/pagesConfig';
import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { GenericPageItemProps } from './utils';

interface PageSectionProps extends GenericPageItemProps {
  hideTitle?: boolean;
  rows: PageRow[];
}

const PageSection: React.FC<PageSectionProps> = (props) => {
  const { t, } = useTranslation([props.pageKey, 'global']);

  const renderColumn = (col: PageColumn, index: number) => {
    return <div
      className={col.className}
      key={col.key ? col.key : index.toFixed()}>
      {col.items.map(item => props.renderGenericItemFunc(item))}
    </div>
  }

  const renderPageTitle = () => {
    if (!props.hideTitle) {
      return <h2 className="fw-bold">
        {t(`${props.itemKey}.title`)}
      </h2>
    }
    return null
  }

  const renderRows = () => {
    if (props.rows === undefined) {
      return <p className="text-danger">No rows found</p>
    }
    return props.rows.map(row => {
      if (row.columns === undefined) {
        return <p className="text-danger">No cols found</p>
      }
      return <div
        key={row.key}
        className={clsx({
          "row": row.rowClassNameOverride === undefined,
        }, row.rowClassNameOverride, row.containerClassName)}>
        {row.columns.map((col, index) => renderColumn(col, index))}
      </div>

    })
  }

  return (
    <div className={clsx("border-top-4 border-primary pt-1", props.className)}>
      {renderPageTitle()}
      {renderRows()}
    </div>
  );
};

export default PageSection;
