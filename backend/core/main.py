#!/usr/bin/env python
# -*- coding: utf-8 -*- 
#PrimusChat - by MLEAFIT
from flask import Flask, render_template, request, flash, redirect ,session,jsonify
app = Flask(__name__)
class webpage():
  @app.route("/")
  def index():
    return render_template("index.html")
  @app.route('/api/receive_data', methods=['POST'])
  def receive_data():
    data = request.json
    #new_data=tanslate(data)#later you will code send in the return 
    print(data)
    #in frontend in console you will obtein "Data received successfully!"
    return jsonify({"message": "Data received successfully!"})
