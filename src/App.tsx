import { AppCore } from 'case-web-app-core';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { pagesConfig } from './configs/pages';
import { navbarConfig } from './configs/navbar';
import { headerConfig } from './configs/header';
import { footerConfig } from './configs/footer';
import ReportMap from './components/ReportMap';

/*if (process.env.REACT_APP_DEFAULT_INSTANCE) {
  appConfig.instanceId = process.env.REACT_APP_DEFAULT_INSTANCE;
}*/

const extensions = [
  { name: 'reportMap', component: ReportMap }
]

const App: React.FC = () => {
  const { i18n } = useTranslation();

  // Currently, only "nl" selection is available, make sure it stays that:
  useEffect(() => {
    if (i18n.language !== 'nl') {
      i18n.changeLanguage('nl');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language])

  return (
    <AppCore
      //appConfig={appConfig}
      headerConfig={headerConfig}
      navbarConfig={navbarConfig}
      pagesConfig={pagesConfig}
      footerConfig={footerConfig}
      extensions={extensions}
    />
  );
}

export default App;
