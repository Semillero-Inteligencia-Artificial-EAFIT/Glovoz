#!/usr/bin/env python
# -*- coding: utf-8 -*- 
#PrimusChat - by MLEAFIT

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

def chatGPT(msg:str,api_key:str)->str:
	"""
	chatGPT(msg,api_key)
		- msg is mesage to chatgpt
		- api_key your api key of chat gpt
	return answer of chatgpt
	"""
	import openai
	openai.api_key = api_key
	completion = openai.ChatCompletion.create(
		model="gpt-3.5-turbo",
		messages=[
			{"role": "user", "content": msg}
		])
	return  completion.choices[0].message.content

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
