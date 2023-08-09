import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [message, setMessage] = useState("");
  const sendDataToFlask = async (data) => {
    try {
      const response = await axios.post("/api/receive_data", data);
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error sending data to Flask:", error);
    }
  };

  useEffect(() => {
    // Call the function to send data to Flask when the component mounts
    const dataToSend = {
      langue: "es",
      msg: "hola mundo",
      // Add more data as needed
    };
    sendDataToFlask(dataToSend);
  }, []);

  return (
    <div>
      <h1>{message}</h1>
      {/* Your other React components and UI here */}
    </div>
  );
};

export default App;
