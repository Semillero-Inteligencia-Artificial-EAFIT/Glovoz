#!/usr/bin/env python
# -*- coding: utf-8 -*- 
#PrimusChat - by MLEAFIT
from flask import Flask, render_template, request, flash, redirect ,session,jsonify
from core.tools.tools import *

app = Flask(__name__)
class webpage():
  @app.route("/")
  def index():
    return render_template("index.html")
  #@app.route('/api/receive_data', methods=['POST'])
  @app.route('/api/receive_data', methods=['GET','POST'])
  def receive_data():
    if request.method == 'POST':
      
      # translating functionality
      data = request.json
      #print(data["text"],data["text"])
      
      data= webTranslate(data["text"],data["lang"][:2],data["targetLang"][:2])
      #in frontend in console you will obtein "Data received successfully!"
      return jsonify({"message": data})
  @app.route("/api/transcript_data", methods=["POST"])
  def transcript_data():
    #audio input functionality
      file = request.files["file"]
      print(file)
      # with open("message.mp3","wb") as aud:
      #   aud_stream = file.read()
      #   aud.write(aud_stream)
      # transcript = whisperTranscript("message.mp3")
      # print(transcript)
      return {"message": "ok"}

