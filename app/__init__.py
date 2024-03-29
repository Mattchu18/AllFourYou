import os
from flask import Flask, request, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import generate_csrf
from flask_login import LoginManager
from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.review_routes import review_routes
from .api.booking_route import booking_routes
from .api.task_routes import task_routes
from .api.search_routes import search_routes
from .api.tasker_routes import tasker_routes
from .api.billing_route import billing_routes
from .api.messages_routes import message_routes
from .seeds import seed_commands
from .config import Config
from .socket import socketio
app = Flask(__name__, static_folder='../react-app/build', static_url_path='/')

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(billing_routes, url_prefix='/api/billing')
app.register_blueprint(review_routes, url_prefix='/api/reviews')
app.register_blueprint(booking_routes, url_prefix='/api/bookings')
app.register_blueprint(task_routes, url_prefix='/api/tasks')
app.register_blueprint(tasker_routes, url_prefix='/api/taskers')
app.register_blueprint(search_routes, url_prefix='/api/search')
app.register_blueprint(message_routes, url_prefix='/api/messages')
db.init_app(app)
Migrate(app, db)
socketio.init_app(app)
# Application Security
CORS(app, resources={r"/*": {"origins": "https://taskpanda-6a6ccf8b8f46.herokuapp.com/"}})


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                    app.view_functions[rule.endpoint].__doc__ ]
                    for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
    return route_list


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

# import your socketio object (with the other imports at the
# top of the file)
# in this example, the file from the previous step is named socket.py


# initialize the app with the socket instance
# you could include this line right after Migrate(app, db)


# at the bottom of the file, use this to run the app
if __name__ == '__main__':
    socketio.run(app)
