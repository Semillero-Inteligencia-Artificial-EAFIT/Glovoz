import firebase from "firebase/compat/app";
import { auth, db } from "../lib/firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { styled } from "styled-components";
import { Container } from "./Layout";
import Button from "./Button";
import Input from "./Input";

// CSS utilizando styled-components
const RoomForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  text-align: center;
  button,
  input {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
  padding: 0 20px;
  @media screen and (min-width: 768px) {
    margin-top: 50px;
    margin-right: 100px;
    flex-direction: row;
    text-align: left;
    gap: 5px;
  }
`;

const OptimusContainer = styled.div`
  @keyframes bounce {
    50% {
      transform: translateY(-35px);
      opacity: 1;
    }
  }
  cursor: pointer;
  position: relative;

  &:hover {
    img {
      animation-name: bounce;
      animation-timing-function: ease-in-out;
    }
  }
`;

const AnimationImage = styled.img`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    position: absolute;
    width: 90px;
    right: -98px;
    top: -29px;
    z-index: 0;
    animation-duration: 4s;
    animation-iteration-count: 1;
    transform-origin: bottom;
    opacity: 0;
  }
`;

const ButtonContainer = styled.div`
  @media screen and (min-width: 768px) {
    position: absolute;
    z-index: 4;
    width: 150px;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  padding: 10px;
  text-align: center;
  margin-bottom: 0;
  @media screen and (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const SubTitle = styled.h1`
  font-size: 2rem;
  color: gray;
  text-align: center;
  padding: 10px;
  @media screen and (min-width: 768px) {
    padding: 0;
    margin-top: 10px;
  }
`;

export default function EnterRoom() {
  const [user] = useAuthState(auth);

  // Estados del Form
  const [roomId, setRoomId] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const [enterRoom, setEnterRoom] = useState(false);
  const [animate, setAnimate] = useState(false);

  // Nombre de usuario en formato
  const formattedUser = user.displayName.split(" ")[0];

  if (user === undefined || user === null)
    return <Navigate to="/" replace={true} />;

  function goToRoom() {
    return <Navigate to={`/room/${roomId}`} replace={true} />;
  }

  // Entrar o crear una sala
  async function joinRoom() {
    const { uid } = user;

    // Busca sala en base de datos
    const roomRef = doc(db, "rooms", roomId);
    const docSnap = await getDoc(roomRef);
    const roomData = docSnap.data();

    // Si no existe la crea, si existe, redirije a la sala
    if (roomData === undefined) {
      const data = {
        id: roomId,
        password: roomPassword,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        members: [uid],
      };
      await addDoc(collection(db, "rooms", roomId, "messages"), {
        text: `${user.displayName} has joined the chat!`,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid: "chatBot",
        lang: "en",
      });

      await setDoc(roomRef, data);
      setEnterRoom(true);
    } else {
      if (roomData.password === roomPassword) {
        if (!roomData.members.includes(uid)) {
          await updateDoc(roomRef, {
            members: arrayUnion(uid),
          });
          await addDoc(collection(db, "rooms", roomId, "messages"), {
            text: `${user.displayName} has joined the chat!`,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid: "chatBot",
            lang: "en",
          });
        }
        setEnterRoom(true);
      } else {
        alert("Wrong password!");
      }
    }
  }

  return (
    <Container>
      {enterRoom ? (
        goToRoom()
      ) : (
        <div>
          <Title>Bienvenid@, {formattedUser}</Title>
          <SubTitle>¡En PRIMUS, el lenguaje no es una barrera!</SubTitle>
          <RoomForm>
            <Input
              placeholder="Enter room id"
              value={roomId}
              onChange={(ev) => setRoomId(ev.target.value)}
            />
            <Input
              placeholder="Enter room password"
              value={roomPassword}
              onChange={(ev) => setRoomPassword(ev.target.value)}
            />
            <OptimusContainer>
              <AnimationImage
                src={require("../images/optimusPrime.png")}
                alt="optimus"
                animate={animate}
              />
              <ButtonContainer>
                <Button
                  onClick={joinRoom}
                  $mode="primary"
                  onHover={() => setAnimate(true)}
                >
                  Join Room
                </Button>
              </ButtonContainer>
            </OptimusContainer>
          </RoomForm>
        </div>
      )}
    </Container>
  );
}
