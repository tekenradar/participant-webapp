import { HeaderConfig } from "case-web-app-core/build/types/headerConfig";

export const headerConfig: HeaderConfig = {
  config: {
    type: 'simpleLogo',
    className: 'd-flex justify-content-center',
    image: {
      altKey: 'logoAlt',
      sm: {
        url: '/images/placeholder_image.png',
        className: 'pb-2 d-block mx-auto',
        height: 55
      },
      lg: {
        url: '/images/placeholder_image.png',
        className: 'pb-2',
        height: 75
      }
    },
    useLanguageSelector: false
  }
}
