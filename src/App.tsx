import React, { useState, useRef, useEffect } from "react";
import firebase from "firebase/firebaseconfig";
import "./App.css";

type chatForm = {
  id: number;
  text: string;
  date: string;
};

const App: React.FunctionComponent = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState<chatForm[] | undefined>();
  const [datas, setDatas] = useState<chatForm[] | undefined>();
  const nextId = useRef(1);
  const userRef = firebase.database().ref("messages");

  // This function is called when the input changes
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value);

  // This function is triggered when the Search buttion is clicked
  const send = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.length === 0) return;
    console.log(text);
    const temp: chatForm = {
      id: nextId.current,
      text: text,
      date: "",
    };
    userRef.push(temp);
    const T: chatForm[] = result && result.length > 0 ? [...result, temp] : [temp];
    setResult(T);
    setText("");
    nextId.current += 1;
  };

  useEffect(() => {
    userRef.on("value", (snapshot) => {
      const users = snapshot.val();
      const usersData = [];
      for (let id in users) {
        usersData.push({ ...users[id], id });
      }

      setDatas(usersData);
      console.log(datas);
    });
  }, []);

  return (
    <div className="container">
      {/* Display search result */}
      <div className="chat_box">
        <ul>
          {datas && datas.length > 0 ? (
            [...datas].reverse().map((data) => (
              <div key={data.id}>
                <li>{data.text}</li>
              </div>
            ))
          ) : (
            <p></p>
          )}
        </ul>
      </div>

      <form className="text_box" onSubmit={send}>
        <input value={text} onChange={inputHandler} placeholder="채팅창" className="text_box__input" />
        <button type="submit" className="text_box__button">
          보내기
        </button>
      </form>
    </div>
  );
};

export default App;
