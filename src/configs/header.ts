import { HeaderConfig } from "case-web-app-core/build/types/headerConfig";

export const headerConfig: HeaderConfig = {
  config: {
    type: 'simpleLogo',
    className: 'd-flex align-left',
    image: {
      altKey: 'logoAlt',
      sm: {
        url: '/images/tekenradar_logo_A1.png',
        className: 'pb-2 d-block mx-auto mt-2',
        height: 80
      },
      lg: {
        url: '/images/tekenradar_logo_A1.png',
        className: 'pb-2 mt-2',
        height: 100
      }
    },
    useLanguageSelector: false
  }
}
