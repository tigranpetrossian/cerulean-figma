import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import BrowserPreview from './BrowserPreview';

const PREVIEW_ENV = process.env.PREVIEW_ENV;
ReactDOM.render(!PREVIEW_ENV ? <App /> : <BrowserPreview />, document.getElementById('react-page'));
