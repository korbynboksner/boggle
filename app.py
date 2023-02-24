from flask import Flask, render_template, request, redirect, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

app = Flask(__name__)
app.config['SECRET_KEY'] = "s"

boggle_game = Boggle()



@app.route("/")
def start():

    board = boggle_game.make_board()
    session['board']=board
    return render_template("home.html", board=board)

@app.route("/guess")
def guess():
    word = request.args["word"]
    board=session["board"]
    response = boggle_game.check_valid_word(board, word)
    return jsonify({'result': response})