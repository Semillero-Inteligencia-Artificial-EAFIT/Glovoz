#!/usr/bin/env python
# -*- coding: utf-8 -*- 
#PrimusChat - by MLEAFIT
from flask import Flask, render_template, request, flash, redirect ,session,jsonify
from core.tools.tools import *
import io
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
# UPLOAD_FOLDER = "./"
# app.config["UPLOAD_FOLDER"]=UPLOAD_FOLDER
class webpage():
  @app.route("/")
  def index():
    return render_template("index.html")
  #@app.route('/api/receive_data', methods=['POST'])
  @app.route('/api/receive_data', methods=['POST'])
  def receive_data(): 
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
  #     # filepath = os.path.join(app.config["UPLOAD_FOLDER"], "audio")
  #     # file.save(filepath)
  #     # file.seek(0)
  #     # data, samplerate = soundfile.read(file)
  #     # with io.BytesIO() as fio:
  #     #   soundfile.write(fio,
  #     #                   data,
  #     #                   samplerate=samplerate,
  #     #                   subtype="PCM_16",
  #     #                   format="wav")
  #     #   data = fio.getvalue()
  #     # with open("audio.wav", "rb") as fp:
  #     #   audio = fp.read()
  #     # transcript = whisperTranscript("audio")
  #     # print(data)
      return {"message": "ok"}

