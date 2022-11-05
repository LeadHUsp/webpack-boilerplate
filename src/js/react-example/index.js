import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

export const initReactApp = () => {
  const root = ReactDOM.createRoot(document.getElementById('root-react'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};
