import os
import playsound
import time
import pyaudio
from gtts import gTTS
import google.generativeai as genai
import speech_recognition as sr
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from PyLyrics import *

genai.configure(api_key="AIzaSyCnUgtvpf2OE2fqwdIoDwLP3MlEKzA4rSw")


lang = "en"

app=Flask(__name__)
CORS(app)
@app.route("/submit",methods=["POST","GET"])
def get_song():
    result = request.form['user_input']
    said="Provide the original chords, original key of the song, lyrics and capo position of the song" + result +". your results should strictly be based on resources such as tabs.ultimate-guitar.com, chordtela, chordie. do not use any other sources other than those mentioned. get the lyrics from popular websites such as genius and musixmatch. the result should strictly be in a json format. the first index of the json should always be the key, the second index should be the chords of the song and the third index should be the fret number on which i should use a capo on, if required. it should always look like {key: '', chords: {}, 'capo':'', lyrics:''}. chords of the song can be nested and divided into verse, chorus. do not try to change the formatting. do not add anything before and after the json. do not add new lines in the json. give the result in a continuous string"

    if "Provide" in said:
                # Set up the model
        generation_config = {
            "temperature": 0.5,
            "top_p": 1,
            "top_k": 1,
            "max_output_tokens": 2048,
        }

        safety_settings = [
            {
                "category": "HARM_CATEGORY_HARASSMENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_HATE_SPEECH",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
        ]

        model = genai.GenerativeModel(model_name="gemini-1.0-pro",
                                      generation_config=generation_config,
                                      safety_settings=safety_settings)

        convo = model.start_chat(history=[
        ])

        convo.send_message(said)
        text = convo.last.text

        x=json.loads(text)
        x.update(song=result)
        print(x)
    return (x)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
