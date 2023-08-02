import React, { useEffect,useState } from 'react';
import axios from 'axios';

const App = () => {
  const sendDataToFlask = async (data) => {
    try {
      const response = await axios.post('/api/receive_data', data);
      console.log(response.data.message);
    } catch (error) {
      console.error('Error sending data to Flask:', error);
    }
  };

  useEffect(() => {
    // Recive data from backed and print it in console
    fetch("/api/receive_data").then(response=>{
      if(response.ok){
        return response.json()
      }
    }).then(data=>console.log(data))
    // Call the function to send data to Flask when the component mounts
    const dataToSend = {
      langue: 'es',
      msg: 'hola mundo',
      // Add more data as needed
    };
    sendDataToFlask(dataToSend);
  }, []);

  return (
    <div>
      <h1>React App</h1>
      {/* Your other React components and UI here */}
    </div>
  );
};

export default App;
