import { PageRow, TeaserImageConfig } from "case-web-app-core/build/types/pagesConfig";

export const fullWidthTeaserImageRow = (key: string, config: TeaserImageConfig): PageRow => {
  return {
    key: 'row_' + key,
    fullWidth: true,
    columns: [
      {
        key: 'col',
        className: 'w-100 p-0',
        items: [
          {
            itemKey: key,
            config: config
          },
        ]
      }
    ]
  }
}
