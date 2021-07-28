import React, { useState, useRef, useEffect } from 'react';
import firebase from 'services/firebase/firebaseconfig';
import 'components/chat-window/style/ChatWindow.css';
import $ from 'jquery';
import ResetButton from 'components/reset-button/resetButton';

type chatForm = {
  id: string;
  text: string;
  date: string;
};

const ChatWindow: React.FunctionComponent = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<chatForm[] | undefined>();
  const messageRef = firebase.database().ref('messages');

  const textHandler = (event: any) => setText(event.target.value);

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setText(text.replace('\n', '<br>'));
    var stripLeftSpace = text;
    stripLeftSpace = stripLeftSpace.trimLeft();
    //console.log(`${stripLeftSpace} length is ${stripLeftSpace.length}`);
    if (stripLeftSpace.length === 0) {
      setText('');
      return;
    }
    let dateTime = new Date();
    const message: chatForm = {
      id: '',
      text: text,
      date: dateTime.toLocaleString(),
    };
    //console.log(`${text} length is ${text.length}`);
    $('#chat_box__ul').scrollTop($('#chat_box__ul')[0].scrollHeight);
    messageRef.push(message);
    setText('');
  };

  useEffect(() => {
    messageRef.on('value', (snapshot) => {
      const messagesFromFirebase = snapshot.val();
      const messagesToHook = [];
      for (let id in messagesFromFirebase) {
        messagesToHook.push({ ...messagesFromFirebase[id], id });
      }
      setMessages(messagesToHook);
    });
  }, []);

  const onEnterPress = (event: any) => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      event.preventDefault();
      sendMessage(event);
    }
  };

  const reset = () => {
    if (messages && messages.length > 0) {
      messages.map((message) => messageRef.child(message.id).remove());
    }
  };

  return (
    <div className='container'>
      <ResetButton reset={reset}/>
      <div className='chat_box'>
        <ul id='chat_box__ul'>
          {messages && messages.length > 0 ? (
            [...messages].reverse().map((message) => (
              <div key={message.id}>
                <li>
                  {message.date}
                  <br />
                  <textarea value={message.text} />
                  <br />
                  <br />
                </li>
              </div>
            ))
          ) : (
            <p></p>
          )}
        </ul>
      </div>
      <form className='text_box' onSubmit={sendMessage}>
        <textarea
          value={text}
          onChange={textHandler}
          className='text_box__input'
          placeholder='채팅창'
          onKeyDown={onEnterPress}
        />
        <button type='submit' className='text_box__button'>
          보내기
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
