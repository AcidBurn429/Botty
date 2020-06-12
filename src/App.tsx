import React from 'react';
import './App.css';
import { ProgrammingChatBot } from './Chat';
import { createStore } from 'redux';
import { chatBotReducer } from './state';
import { Provider } from 'react-redux';

function App() {
  const store = createStore(chatBotReducer);

  return (
    <Provider store={store}>
      <ProgrammingChatBot />
    </Provider>
  );
}

export default App;
