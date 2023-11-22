import { useState } from "react";
import {
  RoomForm,
  OptimusContainer,
  AnimationImage,
  ButtonContainer,
} from "../../components/styles/StyledEnterRoom";
import Button from "../../components/styles/Button";
import Input from "../../components/styles/Input";
import {
  useAddMemberByRoomIdMutation,
  useAddMessageMutation,
  useAddRoomMutation,
  useGetRoomQuery,
} from "./roomSlice";
import { useNavigate } from "react-router-dom";

const EnterRoomForm = (props) => {
  const { user } = props;
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const [animate, setAnimate] = useState(false);

  const { data, refetch } = useGetRoomQuery({ roomId, password: roomPassword });
  const [addRoom] = useAddRoomMutation();
  const [addMessage] = useAddMessageMutation();
  const [addMemberByRoomId] = useAddMemberByRoomIdMutation();

  const changeId = (ev) => setRoomId(ev.target.value);
  const changePassword = (ev) => setRoomPassword(ev.target.value);
  const changeAnimate = (ev) => setAnimate(true);
  const optimusImage = require("../../images/optimusPrime.png");

  const navigateToRoom = () => {
    navigate(`/room/${roomId}`);
  };

  const joinRoom = async () => {
    refetch();
    if (!data) {
      const messageData = {
        text: `${user.displayName} has created the room!`,
        lang: "en",
        uid: "chatBot",
      };
      await addRoom({ roomId, password: roomPassword, uid: user.uid });
      await addMessage({ roomId, data: messageData });
      navigateToRoom();
      return;
    }

    if (data === "wrong") {
      alert("Wrong password :(");
      return;
    }

    if (!data.members.includes(user.uid)) {
      const messageData = {
        text: `${user.displayName} has joined the chat!`,
        lang: "en",
        uid: "chatBot",
      };
      await addMessage({ roomId, data: messageData });
      await addMemberByRoomId({ roomId, uid: user.uid });
    }
    navigateToRoom();
  };

  return (
    <RoomForm>
      <Input placeholder="ID de sala" value={roomId} onChange={changeId} />
      <Input
        placeholder="Contraseña"
        value={roomPassword}
        onChange={changePassword}
      />
      <Button onClick={joinRoom} $mode="primary" onHover={changeAnimate}>
        Crear / Unirse
      </Button>
    </RoomForm>
  );
};

export default EnterRoomForm;
