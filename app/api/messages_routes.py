from flask_login import login_required, current_user
from flask import Blueprint, render_template, redirect, request
from app.models.message import Message
from app.models.user_message import User_Message

message_routes = Blueprint("messages", __name__,url_prefix='')


@message_routes.route("/<int:id>/messages")
@login_required
def get_all_messages_between_users(id):
    """
    Messages between users
    """
    # all_messages = Message.query.filter(current_user.id == Message.user_join_message).all()
    msg = Message.query.get(id)
    print(msg)
    return "hello"