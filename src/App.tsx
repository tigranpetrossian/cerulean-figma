import React, { useEffect, useState } from 'react';
import { Main } from 'components/Main';

function sendMessage(msg: any) {
  parent.postMessage({ pluginMessage: msg }, '*');
}

function App() {
  useEffect(() => {
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  useEffect(() => {
    sendMessage('GET_STYLES');
  }, []);

  const onMessage = (event) => {
    console.log(event.data.pluginMessage);
  };

  return <Main></Main>;
}

export default App;
