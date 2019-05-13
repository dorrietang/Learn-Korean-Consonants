from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

@app.route('/')
def home():
   return render_template('home.html')

@app.route('/bp')
def bp():
    return render_template('bp.html')

@app.route('/bp_quiz')
def bp_quiz():
    return render_template('bp_quiz.html')

if __name__ == '__main__':
   app.run(debug = True)