import {
  Flag,
  ImageContainer,
  Message,
} from "../../components/styles/StyledMessage";
import { flags } from "../../lib/languages";

export default function ChatMessage(props) {
  const { user, message, userLang } = props;
  const { text, uid, photoURL, lang } = message;

  // Verificamos si usuario inicio sesión
  if (!user) {
    return <></>;
  }

  // Verificamos si el mensaje lo envio el usuario y otra presona
  let messageclass = uid === user.uid ? "sent" : "received";

  // Verificamos si lo envio el bot
  if (uid === "chatBot") messageclass = "chatBot";

  const messageContent =
    message.lang === userLang ? text : message[userLang] || text;

  const messageImage =
    uid !== "chatBot" ? <img src={photoURL} alt="profile" /> : <></>;

  const messageFlag = uid !== "chatBot" ? <Flag>{flags[lang]}</Flag> : <></>;

  return (
    <Message messageclass={messageclass}>
      <ImageContainer>
        {messageImage}
        {messageFlag}
      </ImageContainer>
      <p>{messageContent}</p>
    </Message>
  );
}
