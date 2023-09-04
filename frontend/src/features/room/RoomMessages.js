import {
  useGetMessagesByRoomIdQuery,
  useUpdateMessageMutation,
} from "./roomSlice";
import { useEffect, useRef, useState } from "react";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Main } from "../../components/styles/StyledRoom";
import Loader from "../../components/Loader";
import ChatMessage from "./ChatMessage";
import axios from "axios";

const synth =
  window.speechSynthesis ||
  window.SpeechSynthesis ||
  window.webkitSpeechSynthesis;

const RoomMessages = (props) => {
  const { roomId, user, lang } = props;
  const dummy = useRef();

  const { data, isLoading, isSuccess, isError, error, refetch } =
    useGetMessagesByRoomIdQuery(roomId);
  const [updateMessage] = useUpdateMessageMutation();

  const [dataChanged, setDataChanged] = useState(false);
  const [translated, setTranslated] = useState(false);

  useEffect(() => {
    if (!dataChanged && data) {
      checkForNewValues();
    } else if (data) {
      setTranslated(false);
      refetch().then((res) => {
        translateMessages();
        setDataChanged(false);
      });
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data, dataChanged]);

  const translateMessages = async () => {
    const lastMessage = data[data.length - 1];
    const lastMessageTime =
      new Date().getTime() / 1000 - lastMessage?.createdAt?.seconds;
    console.log({ lastMessage, lastMessageTime });
    if (lastMessageTime < 6) {
      if (lastMessage?.lang !== lang && !lastMessage[lang] && !translated) {
        try {
          const data = {
            text: lastMessage.text,
            lang: lastMessage.lang,
            targetLang: lang,
          };
          await axios.post("/api/receive_data", data).then((res) => {
            const newText = {
              [lang]: res.data.message,
            };
            const u = new SpeechSynthesisUtterance(res.data.message);
            u.lang = lang;
            synth.speak(u);
            updateMessage({ roomId, messageId: lastMessage.id, data: newText });
            setTranslated(true);
          });
        } catch (error) {
          console.log(error);
        }
      } else if (lastMessage.lang === lang && lastMessage.uid !== user.uid) {
        const u = new SpeechSynthesisUtterance(lastMessage.text);
        u.lang = lang;
        synth.speak(u);
      }
    }
  };

  const checkForNewValues = () => {
    const q = query(
      collection(db, "rooms", roomId, "messages"),
      orderBy("createdAt", "desc"),
      limit(1)
    );
    onSnapshot(q, (doc) => {
      let lastMessageId;
      doc.forEach((m) => {
        lastMessageId = m.id;
      });
      const lastDataMessageId = data[data.length - 1]?.id;
      if (lastMessageId !== lastDataMessageId) {
        setDataChanged(true);
      }
    });
  };

  let messages;
  if (isLoading) messages = <Loader />;
  else if (isSuccess && data)
    messages = data.map((msg, index) => (
      <ChatMessage key={index} message={msg} userLang={lang} user={user} />
    ));
  else if (isError) console.log(error);

  return (
    <Main>
      {messages}
      <div ref={dummy}></div>
    </Main>
  );
};

export default RoomMessages;
