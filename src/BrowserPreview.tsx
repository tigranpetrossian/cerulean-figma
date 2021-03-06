import React, { useState, useEffect, useRef } from 'react';
import App from './App';

const PREVIEW_ENV = process.env.PREVIEW_ENV;

function BrowserPreview() {
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  const onWindowMsg = (msg) => {
    if (msg.data.pluginMessage) {
      const message = JSON.stringify(msg.data.pluginMessage);
      if (ws.current && ws.current.readyState === 1) {
        ws.current.send(message);
      } else {
        setTimeout(() => {
          onWindowMsg(msg);
        }, 1000);
      }
    }
  };

  const startWebSocket = () => {
    ws.current = new WebSocket('ws://localhost:9001/ws');
    ws.current.onopen = () => {
      // TODO: Doesn't look like this works correctly
      console.log('ws opened');
      setIsConnected(true);
    };
    ws.current.onclose = () => {
      console.log('ws closed');
      setIsConnected(false);

      setTimeout(() => {
        startWebSocket();
      }, 3000);
    };

    ws.current.onmessage = (event) => {
      try {
        let msg = JSON.parse(event.data);
        if (msg.src === 'server') {
          let temp = JSON.parse(msg.message);
          window.parent.postMessage({ pluginMessage: temp }, '*');
        }
      } catch (err) {
        console.error('not a valid message', err);
      }
    };

    window.addEventListener('message', onWindowMsg);

    return () => {
      ws.current && ws.current.close();
      window.removeEventListener('message', onWindowMsg);
    };
  };

  useEffect(() => {
    startWebSocket();
  }, []);

  return (
    <>
      <div>Status: {isConnected ? 'Connected' : 'Connected'}</div>
      {PREVIEW_ENV === 'browser' && setIsConnected && (
        <div
          style={{
            width: 750,
            height: 500,
            margin: '100px auto 0',
            boxShadow: '0 1px 2px rgba(0,0,0,.04), 0 4px 16px rgba(0,0,0,.04)',
            border: '1px solid #eee',
            borderRadius: 2,
          }}
        >
          <App />
        </div>
      )}
    </>
  );
}

export default BrowserPreview;
