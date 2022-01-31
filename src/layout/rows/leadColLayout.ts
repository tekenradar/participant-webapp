import { PageColumn, PageItem, PageRow } from "case-web-app-core/build/types/pagesConfig";

export const leadColLayout = (props: {
  rowKey: string;
  rowClassNameOverride?: string;
  containerClassName?: string;
  leadItems: PageItem[];
  panelRows: PageRow[];
  leadColClassName?: string;
  panelColClassName?: string;
}): PageRow => {


  const leadCol = (): PageColumn => {
    return {
      key: props.rowKey + '-lead',
      className: props.leadColClassName ? props.leadColClassName : 'col-12 col-sm-10 col-md-5 col-lg-4',
      items: [
        ...props.leadItems
      ]
    };
  }

  const panelCol = (): PageColumn => {
    const rows: PageItem[] = [];
    props.panelRows.forEach((row, index) => {

      const cols = row.columns.map((column, index): PageItem => {
        return {
          itemKey: column.key ? column.key : index.toFixed(),
          className: column.className,
          config: {
            type: 'container',
            items: column.items,
          }
        }
      })

      rows.push({
        itemKey: row.key,
        className: 'row gy-2a' + ((index < props.panelRows.length - 1) ? ' mb-2a' : ''),
        config: {
          type: 'container',
          items: cols
        }
      })
    })

    return {
      key: props.rowKey + '-panel',
      className: props.panelColClassName ? props.panelColClassName : 'col-12 col-sm-10 col-md-7 col-lg-8',
      items: [
        ...rows,
      ]
    };
  }
  const columns: PageColumn[] = [
    leadCol()
  ];

  if (props.panelRows.length > 0) {
    columns.push(panelCol());
  }

  return {
    key: props.rowKey,
    rowClassNameOverride: props.rowClassNameOverride ? props.rowClassNameOverride : 'row gy-2a justify-content-center',
    containerClassName: props.containerClassName,
    columns: columns,
  }
}
