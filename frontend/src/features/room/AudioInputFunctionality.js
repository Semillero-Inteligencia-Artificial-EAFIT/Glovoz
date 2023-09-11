import axios from "axios";
import { useState } from "react";

let chunks = [];
let recorder = null;

const AudioInputFunctionality = () => {
  const [isRecording, setIsRecording] = useState(false);
  const grabar = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const startRecording = () => {
    console.log("start");
    let constraints = {
      audio: true,
      video: false,
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        recorder = new MediaRecorder(stream);

        recorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };

        recorder.start();
        console.log("Recording started");
        setIsRecording(true);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const stopRecording = () => {
    console.log("stopButton clicked");

    recorder.stop(); //stop microphone access

    const blob = new Blob(chunks, { type: "audio/ogg" });
    sendRecording(blob);
    chunks = [];
    setIsRecording(false);
  };

  const sendRecording = async (blob) => {
    let data = new FormData();
    data.append("file", blob);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    await axios.post("/api/transcript_data", data, config).then((res) => {
      console.log(res);
    });
  };

  return <button onClick={grabar}>grabar o parar</button>;
};

export default AudioInputFunctionality;
