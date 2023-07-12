from flask_login import login_required, current_user
from flask import Blueprint, render_template, redirect, request
from app.models.message import Message
from app.models.user_message import User_Message
from app.models.user import User
from app.models.db import db

message_routes = Blueprint("messages", __name__,url_prefix='')


@message_routes.route("/<int:id>/messages")
@login_required
def get_all_messages_between_users(id):
    """
    Messages between users
    """
    # all_messages = Message.query.filter(current_user.id == Message.user_id).all()

    # user1_id== current_user
    # user2_id== id
    msg = Message.query.filter(id == Message.user_message_id).all()


    return [all_msg.to_dict() for all_msg in msg]

@message_routes.route("/<int:id>/messages", methods=["POST"])
@login_required
def post_message(id):
    """
    Create a message between two users
    """
    user1_id = current_user.id
    user2_id = id

    new_user_message = User_Message(
        user1_id,
        user2_id
        )
    db.session.add(new_user_message)
    db.session.commit()
@message_routes.route("/user_messages/all")
@login_required
def get_user_messages():

    user_messages = User_Message.query.all()
    return [message.to_dict() for message in user_messages]
