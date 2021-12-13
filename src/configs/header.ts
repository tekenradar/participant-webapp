import { HeaderConfig } from "case-web-app-core/build/types/headerConfig";

export const headerConfig: HeaderConfig = {
  config: {
    type: 'simpleLogo',
    className: 'd-flex align-left',
    image: {
      altKey: 'logoAlt',
      sm: {
        url: '/images/tekenradar-logo-colored.png',
        className: 'd-block mx-auto',
        height: 90
      },
      lg: {
        url: '/images/tekenradar-logo-colored.png',
        className: '',
        height: 100
      }
    },
    useLanguageSelector: false
  }
}
