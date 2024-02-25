import React, { useState } from 'react';
import { Puff } from 'react-loader-spinner'
import { IconContext } from "react-icons";
import { AiOutlineSend } from 'react-icons/ai'
import styles from '../styles/ChatInput.module.css'

const ChatInput = ({ onSubmitMessage, loading }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitMessage(message);
        setMessage('');
    };

    return (
            <form action="" className={styles.chatInput} onSubmit={handleSubmit}>
                <input
                    type="text"
                    className={styles.inputField}
                    value={message}
                    placeholder='Ask anything'
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" className={styles.submitButton} disabled={message.trim() === ''}>
                    <IconContext.Provider value={{ size: "1rem" }}>
                        <div>
                            <AiOutlineSend />
                        </div>
                    </IconContext.Provider>
                </button>
                {loading && <Puff
                    height="30"
                    width="30"
                    radius={1}
                    color="#004aad"
                    ariaLabel="puff-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />}
            </form>        
    );
};

export default ChatInput;
