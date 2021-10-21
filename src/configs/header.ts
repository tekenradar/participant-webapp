import { HeaderConfig } from "case-web-app-core/build/types/headerConfig";

export const headerConfig: HeaderConfig = {
  config: {
    type: 'simpleLogo',
    className: 'd-flex justify-content-center',
    image: {
      altKey: 'logoAlt',
      sm: {
        url: '/images/tekenradar_logo_placeholder.png',
        className: 'pb-2 d-block mx-auto',
        height: 55
      },
      lg: {
        url: '/images/tekenradar_logo_placeholder.png',
        className: 'pb-2',
        height: 75
      }
    },
    useLanguageSelector: false
  }
}
