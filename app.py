from flask import Flask, make_response, send_file, session, request, redirect, jsonify
import api
import json
import os
import logging
import twitter
from werkzeug import secure_filename


app = Flask(__name__)
app.config['SECRET_KEY'] = '24KJSF98325KJLSDF972saf29832LFjasf87FZKFJL78f7ds98FSDKLF'
login = False

@app.route("/")
def index():
	return send_file("static/index.html")



def _convert_to_JSON(result):
    """Convert result object to a JSON web request."""
    response = make_response(json.dumps(result))
    response.headers['Access-Control-Allow-Origin'] = "*"
    response.mimetype = "application/json"
    return response

@app.route("/api/twitterStreamingFilter/", methods=['POST'])
def updateSearchFilter():
    search_info = json.loads(request.data)
    #twitter.getTwritterStreaming(search_info.keywords, search_info.users, search_info.hashtags, search_info.boundingBox)
    #TODO: sent it to kafka topic
    return "Success"


@app.route("/api/userLogin/", methods=['GET'])
def getloggedInUserName():
	print "getLoggedInUserName" 
	first_name = ''
	print login
	if login:
		first_name=api.get_username(session['user'])
	print "first_name is "+first_name
	return jsonify({"firstName":first_name})

@app.route("/api/signup/", methods=['POST'])
def add_user():
    new_user = json.loads(request.data)
   
    first_name = new_user.get("first_name")
    last_name = new_user.get("last_name")
    email = new_user.get("email")
    password = new_user.get("password")
    api.create_user( email, password, first_name, last_name)
    logging.info(" called api/signup with user "+first_name);
    return "Success"

@app.route("/api/login/", methods=['POST'])
def login_user():
    user_to_login = json.loads(request.data)
    logging.info(" called api/in with user");
    email = user_to_login.get("email")
    password = user_to_login.get("password")
    
    user_id = api.get_user(email, password)
    session['user'] = user_id
    login = True
    print login
    return "Success"

@app.route("/api/logout/", methods=['POST'])
def process_logout():
	session['user']=-1
	api.logout()
	login = False
	return "Success"


if __name__ == "__main__":
    port = int(os.environ.get('PORT',5000))
    app.run(host='0.0.0.0', port=port)
