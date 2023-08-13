import { useRef, useState, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db } from "../lib/firebase";
import firebase from "firebase/compat/app";
import ChatMessage from "./ChatMessage";
import { languages } from "../lib/languages";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection, orderBy, query } from "firebase/firestore";
import { styled } from "styled-components";
import Button from "./Button";
import { Play } from "./icons/Play";
import { Stop } from "./icons/Stop";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Main = styled.main`
  height: 68vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  border-top: 2px solid #eee;
  padding: 10px;
  @media screen and (max-width: 320px) {
    height: 68vh;
  }
  @media screen and (min-height: 500px) {
    height: 55vh;
  }
  @media screen and (min-height: 900px) {
    height: 70vh;
  }
`;

const FormContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 8vh;
  background-color: #fff;
  bottom: 0;
  padding: 20px 0;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const Form = styled.div`
  max-width: 1000px;
  display: grid;
  grid-template-columns: 0.6fr 1.4fr;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 1.5rem;
  button {
    font-size: 1rem;
    padding-top: 15px;
  }
  select {
    border: none;
    background-color: #ddd;
    font-size: 1rem;
    padding: 15px;
    border-radius: 5px;
    border: 0.1px solid #aaa;
    outline: none;
  }
  @media screen and (max-width: 320px) {
    padding: 0 20px;
    select {
      padding: 15px 5px;
    }
  }
`;

const ButtonSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const RoomName = styled.p`
  text-align: center;
  margin: 0 auto;
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px auto;
  padding: 0 10px;
  @media screen and (min-width: 768px) {
    max-width: 800px;
  }
`;

const Arrow = styled.div`
  border-radius: 50%;
  padding: 3px 6px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    color: #fff;
    background-color: #555;
  }
`;

const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition ||
  window.SpeechRecognitionAlternative;
const mic = new SpeechRecognition();

mic.continious = true;
mic.interimResults = false;
const synth =
  window.speechSynthesis ||
  window.SpeechSynthesis ||
  window.webkitSpeechSynthesis;

export default function ChatRoom() {
  const dummy = useRef();
  const [user] = useAuthState(auth) || auth.currentUser;
  const roomId = window.location.href.split("/").slice(-1)[0];
  const messagesRef = collection(db, "rooms", roomId, "messages");
  const q = query(messagesRef, orderBy("createdAt"));
  const [messages] = useCollectionData(q, { idField: "id" });
  const [isListening, setIsListening] = useState(false);
  const [goBack, setGoBack] = useState(false);
  const [lang, setLang] = useState("es-CO");
  const [messagesLength, setMessagesLength] = useState(0);
  const [translatedMessages, setTranslatedMessages] = useState([]);

  useEffect(() => {
    if (messages) {
      if (translatedMessages.length === 0) {
        setTranslatedMessages([...messages]);
      } else if (translatedMessages.length < messages.length) {
        const lastMessage = messages[messages.length - 1];
        const lastMessageDate = lastMessage?.createdAt?.seconds || 0;
        const currentDate = new Date().getTime() / 1000;
        const messageDif = currentDate - lastMessageDate;
        if (messageDif && messageDif < 6) {
          if (
            messagesLength < messages.length &&
            lastMessage.uid !== user.uid
          ) {
            if (lastMessage.lang !== lang) {
              const data = {
                text: lastMessage.text,
                lang: lastMessage.lang,
                targetLang: lang,
              };
              try {
                axios.post("/api/receive_data", data).then((res) => {
                  //hablar mensaje traducido
                  const u = new SpeechSynthesisUtterance(res.data.message);
                  u.lang = lang;
                  synth.speak(u);
                  setTranslatedMessages((prev) => [
                    ...prev,
                    { ...lastMessage, text: res.data.message },
                  ]);
                });
              } catch (error) {
                console.error("Error sending data to Flask:", error);
              }
            } else {
              const u = new SpeechSynthesisUtterance(lastMessage.text);
              u.lang = lang;
              synth.speak(u);
              setTranslatedMessages((prev) => [...prev, lastMessage]);
            }
            setMessagesLength(messages.length);
          } else if (lastMessage.uid === user.uid) {
            setTranslatedMessages((prev) => [...prev, lastMessage]);
          }
        }
      }
    }
  }, [messages]);

  const sendMessage = async (transcript) => {
    const { uid, photoURL } = user;
    let data = {
      text: transcript,
      lang,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    };
    await addDoc(messagesRef, data);
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    mic.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue...");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("stopped mic onclick");
      };
    }
    mic.onstart = () => {
      console.log("mic on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      sendMessage(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  }, [isListening]);

  return (
    <>
      {goBack && <Navigate to="/" />}
      <ChatHeader>
        <Arrow
          onClick={() => {
            setIsListening(false);
            setGoBack(true);
          }}
        >
          &larr;
        </Arrow>
        <RoomName>{roomId}</RoomName>
      </ChatHeader>
      <Main>
        {translatedMessages.length > 0 &&
          translatedMessages.map((msg, index) => (
            <ChatMessage key={index} message={msg} auth={auth} />
          ))}
        <div ref={dummy}></div>
      </Main>
      <FormContainer>
        <Form>
          <select value={lang} onChange={(ev) => setLang(ev.target.value)}>
            {Object.keys(languages).map((k, index) => {
              return (
                <option value={languages[k]} key={index}>
                  {k}
                </option>
              );
            })}
          </select>
          <Button
            onClick={() => setIsListening((prev) => !prev)}
            $mode={isListening ? "stop" : "play"}
          >
            {isListening ? (
              <ButtonSpan>
                <Stop />
                Parar
              </ButtonSpan>
            ) : (
              <ButtonSpan>
                <Play />
                Grabar
              </ButtonSpan>
            )}
          </Button>
        </Form>
      </FormContainer>
    </>
  );
}
