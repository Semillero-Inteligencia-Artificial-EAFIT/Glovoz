# Glovoz (in process)

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

    git clone https://github.com/MLEAFIT/Glovoz.git

### Run 

**Install requieriments:**

    cd Glovoz/backend
    pip install -r requieriments.txt

**Execute python backend in another terminal:**
    
    python Glovoz.py

**install react :**

    cd Glovoz/frontend
    npm install

**Execute javascript frontend in another terminal:**
    
    npm start run dev



### Made for:
remove languages barriers

In today's interconnected world, language barriers often act as significant roadblocks to effective communication and understanding between individuals from diverse linguistic backgrounds. These barriers hinder collaboration, restrict access to vital information, and impede cultural exchange. However, the voice-to-voice translator we have developed using Chrome plugins, React, TensorFlow, and Flask offers a transformative solution to this age-old problem.

By combining cutting-edge technologies like TensorFlow for language models and Flask for backend processing, our translator significantly reduces the number of required language models, making it more efficient and responsive. This breakthrough not only enhances the user experience but also optimizes resource utilization. Now, users can seamlessly converse in their native languages while receiving real-time translations in English, enabling them to connect with others globally, regardless of language differences. This translator empowers individuals, businesses, and communities alike, fostering cross-cultural understanding and breaking down the barriers that once stood in the way of meaningful interaction and cooperation. With this powerful tool at their disposal, people from all walks of life can embark on a journey of discovery, opening doors to new opportunities, knowledge, and empathy across linguistic borders.

### How we down complexity and amount of translation models 

if we want do a translator with 100 of languages using methotd 1 will need train models 9900 , but we can use methotd 2 and the amount will decrease a lot , we only need 200 train models.

### Methotd 1

We think to make a model for each language translation, like 

    English to Portuges
    English to Spanish 
    Portuges to Spanish
    Portuges to English
    Spanish to Portuges
    Spanish to English

is very computationally very expensive because it need ```K*(K-1)``` models for K language

![Language models complexity](https://raw.githubusercontent.com/Semillero-Inteligencia-Artificial-EAFIT/Glovoz/main/doc/images/1.png)

![Our math intuition](https://raw.githubusercontent.com/Semillero-Inteligencia-Artificial-EAFIT/Glovoz/main/doc/images/2.png)

The nodes of the graph are the languages and the edges are the translations in 2 ways

### Methotd 2

We propose a new method for down complexity using a middle man, this middle man is a commun langue , we going to use English because it is a very commun langue for all people. we have to send or text to our middle man will translate to the destiny , this technic will down complexity(amount of models) from ```K*(K-1)``` To ```2K```

![Our technic](https://raw.githubusercontent.com/Semillero-Inteligencia-Artificial-EAFIT/Glovoz/main/doc/images/3.png)

The Same nodes of the graph are the languages and the edges are the translations in 2 ways, you see the number of edges decrease


### License

This project is licensed under the GPLv3 License - see the LICENSE file for details.

### Disclaimer

Please note that the accuracy of the translations heavily depends on the underlying language detection and TensorFlow-based translation models used. Make sure to choose reliable and suitable models and services for the best user experience.

Happy translating!
