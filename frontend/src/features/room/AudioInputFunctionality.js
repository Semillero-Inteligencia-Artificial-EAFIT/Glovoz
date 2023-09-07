import axios from "axios";
import { useState } from "react";
const MicRecorder = require("mic-recorder-to-mp3");

const recorder = new MicRecorder({
  bitRate: 128,
});
const AudioInputFunctionality = () => {
  const [isRecording, setIsRecording] = useState(false);
  const grabar = () => {
    if (!isRecording) {
      console.log("start");
      recorder
        .start()
        .then(() => {
          setIsRecording(true);
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      console.log("stop");
      recorder
        .stop()
        .getMp3()
        .then(async ([buffer, blob]) => {
          // do what ever you want with buffer and blob
          // Example: Create a mp3 file and play
          const file = new File(buffer, "message.mp3", {
            type: blob.type,
            lastModified: Date.now(),
          });
          const audioURL = URL.createObjectURL(file);
          sendRecording(audioURL);
          //   console.log("Base audio", baseAudio);
          setIsRecording(false);
        })
        .catch((e) => {
          alert("We could not retrieve your message");
          console.log(e);
        });
    }
  };

  const sendRecording = async (file) => {
    const data = new FormData();
    data.append("file", file);
    await axios
      .post("/api/receive_data", data, {
        headers: {
          "Content-Type": "multipart/form_data",
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

  return <button onClick={grabar}>grabar o parar</button>;
};

export default AudioInputFunctionality;
