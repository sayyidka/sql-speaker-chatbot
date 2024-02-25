import React, { useState } from 'react';
import { useSettings } from '../SettingsContext';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import styles from '../styles/App.module.css';

const ChatManager = () => {
  const { sqlAnswerEnabled, sqlModeEnabled } = useSettings();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

    const addMessage = async (message, includeSQL = false) => {
      const newMessage = { sender: 'You', text: message, type: 'message' };
      setMessages(prevMessages => [...prevMessages, newMessage]);

      try {
          setLoading(true);
          const response = await fetch(`${process.env.REACT_APP_API_URL}/ask`, {
            method: 'POST',
            body: JSON.stringify({ 
              query: message,
              sql_in_answer: sqlAnswerEnabled,
              sql_mode: sqlModeEnabled
          }),
            headers: { 'Content-Type': 'application/json' }
        });

          const data = await response.json();
          setLoading(false);

          if (data.error) {
              // Handle API error
              const errorMsg = { sender: 'SQLText', text: `Error: ${data.error}`, type: 'error' };
              setMessages(prevMessages => [...prevMessages, errorMsg]);
          } else {
            const resultMessage = { sender: 'SQLText', text: JSON.stringify(data.snowflake_response, null, 2), type: 'response' };
            setMessages(prevMessages => [...prevMessages, resultMessage]);

            if (sqlAnswerEnabled && data.openai_query) {
                const queryMessage = { sender: 'Generated query', text: data.openai_query, type: 'query' };
                setMessages(prevMessages => [...prevMessages, queryMessage]);
            }
        }
      } catch (error) {
          console.error('There has been a problem with fetch operation:', error);
          setLoading(false);
          const errorMsg = { sender: 'SQLText', text: `Error: ${error.message}`, type: 'error' };
          setMessages(prevMessages => [...prevMessages, errorMsg]);
      }
  };

  return (
    <>
    <div className={styles.chatWindow}>
      <ChatWindow messages={messages} />
    </div>    
      <ChatInput onSubmitMessage={addMessage} loading={loading} />
    </>
  );
};

export default ChatManager;
