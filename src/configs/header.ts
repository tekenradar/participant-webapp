import { HeaderConfig } from "case-web-app-core/build/types/headerConfig";

export const headerConfig: HeaderConfig = {
  config: {
    type: 'simpleLogo',
    className: 'd-flex align-left',
    image: {
      altKey: 'logoAlt',
      sm: {
        url: '/images/tekenradar-logo-neu.png',
        className: 'd-block mx-auto',
        height: 110
      },
      lg: {
        url: '/images/tekenradar-logo-neu.png',
        className: '',
        height: 150
      }
    },
    useLanguageSelector: false
  }
}
