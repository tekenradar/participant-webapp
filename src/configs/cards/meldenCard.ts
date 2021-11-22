import { PageItem } from "case-web-app-core/build/types/pagesConfig";

export const meldenCard = (): PageItem => {
  return {
    itemKey: 'meldenCard',
    config: {
      type: 'placeholder',
      label: 'Tekenbeet melden',
      height: 400
    }
  }
}
