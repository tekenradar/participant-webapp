import { PageItem } from "case-web-app-core/build/types/pagesConfig";

export const meldenCard = (props?: {
  className?: string;
}): PageItem => {
  return {
    itemKey: 'global:meldenCard',
    className: props?.className,
    config: {
      type: 'imageCard',
      showActionBtn: true,
      action: {
        type: 'navigate',
        value: '/melden',
      },
      imageSrc: '/images/no-license/meldencard.jpg',
    }
  }
}
