from flask_socketio import SocketIO, emit
import os
from .models.message import Message
from .models.user_message import User_Message
from .models.db import db

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
    print("this is data====>", data)
    message = Message(
        body = data["body"],
        user_message_id = data["user_message_id"],
        user_id = data["user_id"]
        )
    db.session.add(message)
    db.session.commit()
    emit("chat", data, broadcast=True)
