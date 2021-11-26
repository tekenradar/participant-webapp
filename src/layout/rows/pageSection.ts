import { PageRow } from "case-web-app-core/build/types/pagesConfig";

export const pageSection = (props: {
  sectionKey: string;
  className?: string;
  hideTitle?: boolean;
  rows: PageRow[];
}): PageRow => {
  return {
    key: props.sectionKey + '-parent-row',
    columns: [
      {
        key: props.sectionKey + '-parent-col',
        className: 'col-12',
        items: [
          {
            itemKey: props.sectionKey,
            className: props.className,
            config: {
              type: 'extension',
              config: {
                type: 'pageSection',
                hideTitle: props.hideTitle,
                rows: props.rows
              }
            }
          }
        ]
      }
    ]
  }
}
