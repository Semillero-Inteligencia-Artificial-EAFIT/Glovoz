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

