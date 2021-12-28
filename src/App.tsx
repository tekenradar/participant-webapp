import { AppCore } from 'case-web-app-core';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { pagesConfig } from './configs/pages';
import { navbarConfig } from './configs/navbar';
import { footerConfig } from './configs/footer';
import ReportMap from './components/ReportMap';
import ReportButtonCard from './components/ReportButtonCard';
import Partners from './components/Partners';
import Ribbon from './components/Ribbon';
import PageSection from './components/PageSection';
import ImageGallery from './components/ImageGallery';
import TekenradarSurveyComponent from './components/TekenradarSurveyComponent/TekenradarSurveyComponent';
import { appConfig } from './configs/appConfig';
import Header from './components/Header';

if (process.env.REACT_APP_DEFAULT_INSTANCE) {
  appConfig.instanceId = process.env.REACT_APP_DEFAULT_INSTANCE;
}

const extensions = [
  { name: 'reportMap', component: ReportMap },
  { name: 'reportButtonCard', component: ReportButtonCard },
  { name: 'partners', component: Partners },
  { name: 'pageSection', component: PageSection },
  { name: 'gallery', component: ImageGallery },
  { name: 'surveyComponent', component: TekenradarSurveyComponent },
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
    <React.Fragment>
      <Ribbon>{process.env.REACT_APP_VERSION}</Ribbon>
      <AppCore
        appConfig={appConfig}
        customHeader={<Header />}
        hideDefaultHeader={true}
        navbarConfig={navbarConfig}
        pagesConfig={pagesConfig}
        footerConfig={footerConfig}
        extensions={extensions}
      />
    </React.Fragment>

  );
}

export default App;
