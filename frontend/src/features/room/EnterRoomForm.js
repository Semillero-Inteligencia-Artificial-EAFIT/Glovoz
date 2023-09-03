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
    if (data) {
      if (data === "wrong") {
        alert("Wrong password :(");
        return;
      } else {
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
      }
    } else {
      await addRoom({ roomId, password: roomPassword, uid: user.uid });
      navigateToRoom();
    }
  };

  return (
    <RoomForm>
      <Input placeholder="Enter room id" value={roomId} onChange={changeId} />
      <Input
        placeholder="Enter room id"
        value={roomPassword}
        onChange={changePassword}
      />
      <OptimusContainer>
        <AnimationImage src={optimusImage} alt="optimus" animate={animate} />
        <ButtonContainer>
          <Button onClick={joinRoom} $mode="primary" onHover={changeAnimate}>
            Join Room
          </Button>
        </ButtonContainer>
      </OptimusContainer>
    </RoomForm>
  );
};

export default EnterRoomForm;
