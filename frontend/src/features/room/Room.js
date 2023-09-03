import { useState } from "react";
import { auth } from "../../lib/firebase";
import {
  Arrow,
  ChatHeader,
  RoomName,
} from "../../components/styles/StyledRoom";
import { useLocation, useNavigate } from "react-router-dom";
import RoomInput from "./RoomInput";
import RoomMessages from "./RoomMessages";
import { useGetMemberByRoomIdQuery } from "./roomSlice";
import { useAuthState } from "react-firebase-hooks/auth";

const Room = () => {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();
  const location = useLocation();

  const roomId = location.pathname.split("/").slice(-1)[0];

  const { data } = useGetMemberByRoomIdQuery({ roomId, uid: user?.uid });

  const [isListening, setIsListening] = useState(false);
  const [lang, setLang] = useState("es-CO");

  const goBack = () => {
    setIsListening(false);
    navigate("/");
  };

  if (data === true) {
    return (
      <>
        <ChatHeader>
          <Arrow onClick={goBack}>&larr;</Arrow>
          <RoomName>{roomId}</RoomName>
        </ChatHeader>
        <RoomMessages roomId={roomId} user={user} lang={lang} />
        <RoomInput
          isListening={isListening}
          setIsListening={setIsListening}
          lang={lang}
          setLang={setLang}
          user={user}
          roomId={roomId}
        />
      </>
    );
  } else if (data === false) {
    navigate("/");
  }
};

export default Room;
