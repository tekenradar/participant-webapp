import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import {
  store,
  initI18n,
} from 'case-web-app-core';

import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/js/fontawesome';

import 'bootstrap/dist/js/bootstrap.bundle';
import { LoadingPlaceholder } from 'case-web-ui';

const localeURL = process.env.REACT_APP_CONTENT_URL + '/locales';
initI18n('nl', 'nl', localeURL);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<LoadingPlaceholder
        color="white"
        minHeight="100vh"
      />}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
