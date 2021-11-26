import { PageItem, PageRow } from "case-web-app-core/build/types/pagesConfig";
import clsx from "clsx";

export const simpleSideBarLayout = (props: {
  rowKey: string;
  containerClassName?: string;
  mainColItems: PageItem[];
  sideBarItems: PageItem[];
}): PageRow => {
  return {
    key: props.rowKey,
    containerClassName: props.containerClassName,
    rowClassNameOverride: clsx("row gy-2a justify-content-center"),
    fullWidth: false,
    columns: [
      {
        key: 'mainCol',
        className: "col-12 col-sm-10 col-lg-8",
        items: props.mainColItems,
      },
      {
        key: 'sideBarCol',
        className: "col-12 col-sm-10 col-lg-4",
        items: props.sideBarItems,
      }
    ]
  }
}
