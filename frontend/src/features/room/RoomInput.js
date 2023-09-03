import Button from "../../components/styles/Button";
import {
  ButtonSpan,
  Form,
  FormContainer,
} from "../../components/styles/StyledRoom";
import { languages } from "../../lib/languages";
import { Stop } from "../../components/icons/Stop";
import { Play } from "../../components/icons/Play";
import { useAddMessageMutation } from "./roomSlice";
import { useEffect } from "react";

const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition ||
  window.SpeechRecognitionAlternative;

// Nueva instancia de la herramienta
const mic = new SpeechRecognition();

// Que el input sea continuo, que no pare automaticamente
mic.continious = true;

// Entregue solamente el resultado final de la transcripción
mic.interimResults = false;

const RoomInput = (props) => {
  const { isListening, setIsListening, lang, setLang, user, roomId } = props;
  const [addMessage] = useAddMessageMutation();

  mic.lang = lang;

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

  const changeLang = (ev) => setLang(ev.target.value);
  const changeListening = () => setIsListening((prev) => !prev);

  const sendMessage = async (transcript) => {
    const { uid, photoURL } = user;
    let messageData = {
      text: transcript,
      lang,
      uid,
      photoURL,
    };
    await addMessage({ roomId, data: messageData });
  };

  const langOptions = Object.keys(languages).map((k, index) => {
    return (
      <option value={languages[k]} key={index}>
        {k}
      </option>
    );
  });

  const buttonMode = isListening ? "stop" : "play";
  const playButtonContent = isListening ? (
    <ButtonSpan>
      <Stop />
    </ButtonSpan>
  ) : (
    <ButtonSpan>
      <Play />
    </ButtonSpan>
  );

  return (
    <FormContainer>
      <Form>
        <select value={lang} onChange={changeLang}>
          {langOptions}
        </select>
        <Button onClick={changeListening} $mode={buttonMode}>
          {playButtonContent}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default RoomInput;
