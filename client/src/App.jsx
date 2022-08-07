import React from 'react';
import io from "socket.io-client";
import { useMessagesReducer } from './redux/actions/messageActions';
import { baseUrl } from './redux/urls';
import Router from './Router';

const App = () => {
  const { messagesActions } = useMessagesReducer();

  React.useEffect(() => {
    const newSocket = io(baseUrl, {
      forceNew: true,
      transports: ["websocket"],
    });

    newSocket.on("message", function (message) {
      messagesActions.injectMessage(message);
    });

    return () => newSocket.close();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Router />
    </div>
  );
};

export default App;