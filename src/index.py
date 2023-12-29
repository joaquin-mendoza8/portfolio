from flask import Flask, render_template
import configparser
from datetime import datetime


app = Flask(__name__)


# this context processors allows the below variables to be used in all templates, and you dont need to define it in each.
@app.context_processor
def inject_global_variables():
    config = configparser.ConfigParser()
    config.read('src/config.ini')

    # Access the variables in the "configs" section
    email = config['configs']['email']
    github = config['configs']['github']
    linkedin = config['configs']['linkedin']
    current_year = datetime.now().year

    return {
        'email': email,
        'github': github,
        'linkedin': linkedin,
        'current_year': current_year
    }


@app.route('/')
def index():

    return render_template('index.html')

@app.route('/experience')
def experience():

    return render_template('experience.html')

@app.route('/projects')
def projects():

    return render_template('projects.html')