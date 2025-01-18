#!/usr/bin/env python
# -*- coding: utf-8 -*- 
#Glovoz - by MLEAFIT

def webTranslate(text,source_lang,target_lang):

    """
    Translates text from source language to destiny language using SeamlessM4T.
    
    Args:
        text (str): The text to translate.
        source (str): The source language code (e.g., 'en', 'de').
        target_lang (str): The target language code (e.g., 'es', 'fr').

    Returns:
        str: Translated text.
    """
    # Define language mappings
    language_code_to_name = {
        "de": "deu",
        "en": "eng",
        "es": "spa",
        "ru": "rus",
        "fr": "fra",
        "pt": "pot"
    }

    try:
        # Import required modules
        from transformers import M2M100ForConditionalGeneration, M2M100Tokenizer
        model_name="facebook/m2m100_418M"
        tokenizer = M2M100Tokenizer.from_pretrained(model_name)
        model = M2M100ForConditionalGeneration.from_pretrained(model_name)

        # Set source language
        tokenizer.src_lang = source_lang

        # Tokenize the input text
        encoded =tokenizer(text, return_tensors="pt")

        # Generate translation
        generated_tokens = model.generate(
            **encoded, forced_bos_token_id=tokenizer.get_lang_id(target_lang)
        )

        # Decode the output
        translated_text = tokenizer.decode(generated_tokens[0], skip_special_tokens=True)
        return translated_text
    except ImportError as e:
        return f"Module import error: {e}"

    except Exception as e:
        return f"An error occurred: {e}"



def whisperTranscript(url:str)->str:
	"""
	chatGPT(msg,api_key)
		- msg is mesage to chatgpt
		- api_key your api key of chat gpt
	return answer of chatgpt
	"""
	import whisper
	model = whisper.load_model("base")
	result = model.transcribe(url)
	print(result)
	return  result

def gptTranslate(txt:str,writeIn:str,translateTo:str,api_key:str,prompt="translate {txt} from {writeIn} to {translateTo}")->str:
	"""
	gptTranslate(txt,writeIn,translateTo,api_key,prompt="translate {txt} from {writeIn} to {translateTo}")
	  - txt			  -text to trasnlate
	  - writeIn		  -in which language is it written
	  - translateTo	  -language to be translated
	  - api_key       -your api_key of chatgpt
	  - prompt        -prompt to use to transelate , by defautl is "translate {txt} from {writeIn} to {translateTo}" 
	rember language prefix
	en -> english
	es -> spanish 
	...
	return text translated
	"""
	return chatGPT(prompt.format(txt=txt,writeIn=writeIn,translateTo=translateTo),api_key)
#print(webTranslate("hola","es","de"))