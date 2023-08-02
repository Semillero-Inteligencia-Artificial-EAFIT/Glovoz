# PrimusChat (in process)

This project is a voice-to-voice translator app built using React, Chrome plugins, TensorFlow, and Flask. The app enables users to communicate in different languages by converting spoken language into text, translating it to the target language, and then converting it back to speech for the receiver. By leveraging TensorFlow for language models and Flask for the backend, the app aims to provide efficient and accurate translations.

### Features

1.Speech-to-Text Recognition: The app captures the user's voice input and converts it into text using Chrome's built-in SpeechRecognition API.

2. Text-to-Speech: The translated text is then converted back into speech using Chrome's SpeechSynthesis API, ensuring the receiver can hear the translated message.

3. Reduced Model Usage: By leveraging the power of Chrome plugins, the app aims to decrease the number of required language models on the client-side, making the translation process faster and more resource-efficient. 

4. Translation: After detecting the original language, the app uses TensorFlow-based language models to translate the text into English.

5. Flask Backend: The app communicates with a Flask backend that handles language detection and TensorFlow-based translation tasks.

6. Reduced Model Usage: By leveraging TensorFlow on the backend, the app aims to decrease the number of required language models on the client-side, making the translation process faster and more resource-efficient.

### Screenshots

### Installing
**Download repositories**

    git clone https://github.com/MLEAFIT/PrimusChat.git

### Run 

**Run flask:**

    cd PrimusChat/backend
    python PrimusChat.py

**Run react:**

    cd PrimusChat/frontend
    npm start run dev



### Made for:
remove langues barriers

In today's interconnected world, language barriers often act as significant roadblocks to effective communication and understanding between individuals from diverse linguistic backgrounds. These barriers hinder collaboration, restrict access to vital information, and impede cultural exchange. However, the voice-to-voice translator we have developed using Chrome plugins, React, TensorFlow, and Flask offers a transformative solution to this age-old problem.

By combining cutting-edge technologies like TensorFlow for language models and Flask for backend processing, our translator significantly reduces the number of required language models, making it more efficient and responsive. This breakthrough not only enhances the user experience but also optimizes resource utilization. Now, users can seamlessly converse in their native languages while receiving real-time translations in English, enabling them to connect with others globally, regardless of language differences. This translator empowers individuals, businesses, and communities alike, fostering cross-cultural understanding and breaking down the barriers that once stood in the way of meaningful interaction and cooperation. With this powerful tool at their disposal, people from all walks of life can embark on a journey of discovery, opening doors to new opportunities, knowledge, and empathy across linguistic borders.


### License

This project is licensed under the GPLv3 License - see the LICENSE file for details.

### Disclaimer

Please note that the accuracy of the translations heavily depends on the underlying language detection and TensorFlow-based translation models used. Make sure to choose reliable and suitable models and services for the best user experience.

Happy translating!