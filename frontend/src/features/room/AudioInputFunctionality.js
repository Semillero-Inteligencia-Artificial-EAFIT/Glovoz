import axios from "axios";
import { useState } from "react";
import MicRecorder from "mic-recorder-to-mp3";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const AudioInputFunctionality = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blob, setBlob] = useState({ blobURL: "" });
  const grabar = () => {
    if (!isRecording) {
      navigator.getUserMedia(
        { audio: true },
        () => {
          console.log("Permission Granted");
          setIsBlocked(false);
        },
        () => {
          console.log("Permission Denied");
          setIsBlocked(true);
        }
      );
      startRecording();
    } else {
      stopRecording();
    }
  };

  const startRecording = () => {
    if (isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          setIsRecording(true);
        })
        .catch((e) => console.error(e));
    }
  };

  const stopRecording = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        setBlob({ blob, blobURL });
        setIsRecording(false);
      })
      .catch((e) => console.log(e));
  };

  const sendRecording = async () => {
    let data = new FormData();
    data.append("file", blob.blob);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    await axios.post("/api/transcript_data", data, config).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      <audio src={blob.blobURL} controls />
      <button onClick={grabar}>grabar o parar</button>
      <button onClick={sendRecording}>enviar</button>
    </>
  );
};

export default AudioInputFunctionality;
