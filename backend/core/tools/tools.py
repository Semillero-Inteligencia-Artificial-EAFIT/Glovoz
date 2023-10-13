#!/usr/bin/env python
# -*- coding: utf-8 -*- 
#Glovoz - by MLEAFIT
try:
	def webTranslate(text,source,destiny):
		language_code_to_name = {"de":"deu","en":"eng","es":"spa","ru":"rus","fr":"fra","pt":"pot"}
		from seamless_communication.models.inference import Translator
		import torch 
		translator = Translator(
				"seamlessM4T_large",
				"vocoder_36langs",
				torch.device("cuda:0")
		)
		translated_text, _, _ = translator.predict(text, "t2tt", language_code_to_name[destiny], src_lang=language_code_to_name[source])
		return translated_text
except:
	def webTranslate(txt:str,writeIn:str,translateTo:str)->str:
		"""
		webTranslate(txt,writeIn,translateTo )
		  - txt			  -text to trasnlate
		  - writeIn		  -in which language is it written
		  - translateTo	  -language to be translated
		rember language prefix
		en -> english
		es -> spanish 
		...
		return text translated
		"""
		from deep_translator import GoogleTranslator 
		translatedTxt = GoogleTranslator(source=writeIn, target=translateTo).translate(txt)
		return translatedTxt

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
