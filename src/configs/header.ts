import { HeaderConfig } from "case-web-app-core/build/types/headerConfig";

export const headerConfig: HeaderConfig = {
  config: {
    type: 'simpleLogo',
    className: 'd-flex justify-content-center',
    image: {
      altKey: 'logoAlt',
      sm: {
        url: '/images/logo_tekenradar.png',
        className: 'pb-2 d-block mx-auto mt-1',
        height: 110
      },
      lg: {
        url: '/images/logo_tekenradar.png',
        className: 'pb-2',
        height: 130
      }
    },
    useLanguageSelector: false
  }
}
