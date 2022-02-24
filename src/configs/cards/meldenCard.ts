import { PageItem } from "case-web-app-core/build/types/pagesConfig";

export const meldenCard = (props?: {
  className?: string;
  showMyTekenradarBtn?: boolean;
}): PageItem => {
  return {
    itemKey: 'global:meldenCard',
    className: props?.className,
    config: {
      type: 'extension',
      config: {
        type: 'reportButtonCard',
        showMyTekenradarBtn: props?.showMyTekenradarBtn,
        buttons: [
          { buttonKey: 'tekenBeet', action: { type: 'navigate', value: '/melden' } },
          { buttonKey: 'rodeRing', action: { type: 'navigate', value: '/melden' } },
          { buttonKey: 'lyme', action: { type: 'navigate', value: '/melden' } },
          { buttonKey: 'koorts', action: { type: 'navigate', value: '/melden' } },
        ]
      }
    }
  }
}
