import { css, styled } from "styled-components";
import { flags } from "../lib/languages";

const Message = styled.div`
  display: flex;
  align-items: center;
  p {
    max-width: 500px;
    margin-bottom: 12px;
    line-height: 24px;
    padding: 10px 20px;
    border-radius: 25px;
    position: relative;
    color: white;
    background-color: gray;
  }
  ${(props) =>
    props.messageclass === "chatBot" &&
    css`
      justify-content: center;
      p {
        align-self: center;
        color: white;
      }
    `}
  ${(props) =>
    props.messageclass === "sent" &&
    css`
      flex-direction: row-reverse;
      p {
        align-self: flex-end;
        background-color: #0b93f6;
        color: white;
      }
    `}
  ${(props) =>
    props.messageclass === "received" &&
    css`
      p {
        align-self: flex-end;
        background-color: #17a589;
      }
    `}
    img {
    width: 40px;
    border-radius: 100%;
    margin: 2px 5px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
`;

const Flag = styled.div`
  position: absolute;
  font-size: 12px;
  bottom: -6px;
  padding: 4px;
  border-radius: 50%;
  background: #ccc;
`;

export default function ChatMessage(props) {
  const { auth, message } = props;
  const { text, uid, photoURL, lang } = message;
  let messageclass = uid === auth?.currentUser?.uid ? "sent" : "received";
  if (uid === "chatBot") messageclass = "chatBot";
  if (!auth.currentUser) {
    return <></>;
  }
  return (
    <Message messageclass={messageclass}>
      <ImageContainer>
        <img src={photoURL} />
        <Flag>{flags[lang]}</Flag>
      </ImageContainer>
      <p>{text}</p>
    </Message>
  );
}
