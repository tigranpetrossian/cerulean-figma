import React, { useEffect, useState } from 'react';

function sendMessage(msg: any) {
  parent.postMessage({ pluginMessage: msg }, '*');
}

function App() {
  const [selectedTextNodes, setSelectedTextNodes] = useState<any[]>([]);

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

  return <div></div>;
}

export default App;
