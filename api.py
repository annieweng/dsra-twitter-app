import model
import csv
from datetime import datetime
from operator import itemgetter


"""Error Handler"""

def dsra_error(error):
    """Handle API errors.

        error: (string) error message

        returns: dictionary error object.
    """

    return {
        "result": error,
    }

"""get user first name by id"""
def get_username(id):
	user = mode.User.query.filter_by(id=id).first()
	if user:
		return user.firstname
	else:
		return ''
		
"""Log-in"""

def get_user(email, password):
    """Check if user exists; if exists, authenticate pw and return success msg"""

    user = model.User.query.filter_by(email=email).first()
    if user:
    	
        return user.id
    else:
    	
        return "User does not exist."

"""Log-out"""

def logout():
    """Clear session to log user out of site."""

    model.session.remove()

"""Sign-up"""

def create_user( email, password, first_name, last_name):
    """Get form data and add new user to users table"""

    # Check if user exists
    user = model.User.query.filter_by(email=email).first()

    # If user doesn't exist, create user
    if user == None:
        user = model.User( email=email, password=password, first_name=first_name, last_name=last_name)
        model.session.add(user)
        model.session.commit()
    return "Successfully Added!"



