import React from 'react';
import { ChatProvider } from './ChatContext';
import ChatWindow from './ChatWindow';

const App = () => {
  return (
    <ChatProvider>
      <ChatWindow />
    </ChatProvider>
  );
};

export default App;
