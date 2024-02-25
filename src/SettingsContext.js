import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [sqlAnswerEnabled, setSqlAnswerEnabled] = useState(false);
  const [sqlModeEnabled, setSqlModeEnabled] = useState(false);

  const handleSqlAnswerToggle = () => {
    setSqlAnswerEnabled(!sqlAnswerEnabled);
  };

  const handleSqlModeToggle = () => {
    setSqlModeEnabled(!sqlModeEnabled);
  };

  return (
    <SettingsContext.Provider value={{
      sqlAnswerEnabled,
      handleSqlAnswerToggle,
      sqlModeEnabled,
      handleSqlModeToggle
    }}>
      {children}
    </SettingsContext.Provider>
  );
};
