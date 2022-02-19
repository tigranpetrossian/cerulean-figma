import React, { useEffect, useState } from 'react';

function App() {
  const [selectedTextNodes, setSelectedTextNodes] = useState<any[]>([]);

  const onMessage = (msg) => {
    if (msg.data.pluginMessage && msg.data.pluginMessage.event === 'selected-text-nodes') {
      setSelectedTextNodes(msg.data.pluginMessage.nodes);
    }
  };

  useEffect(() => {
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return <div>App</div>;
}

export default App;
