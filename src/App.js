import React from 'react';
import { SettingsProvider } from './SettingsContext';
import styles from './styles/App.module.css';
import ChatManager from './components/ChatManager'

const App = () => {
  return (
    <SettingsProvider>
      <div className={styles.app}>
        <ChatManager />
      </div>
    </SettingsProvider>   
  );
};

export default App;
