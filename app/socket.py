from flask_socketio import SocketIO, emit
import os


# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    # origins = [
    #     'https://allfouryou.onrender.com/',
    #     'http://localhost:3000/chat'
    # ]
    origins="*"
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins="*")


# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)
