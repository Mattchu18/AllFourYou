from flask import Blueprint, jsonify
from app.models.review import Review
from app.models.tasker import Tasker
from app.models.task import Task
from flask_login import login_required, current_user
from app.models import User
from app.models.db import db


tasker_routes = Blueprint('taskers', __name__, url_prefix='')

# @tasker_routes.route('/<int:id>')
# def get_tasker(id):
#     """
#     Gets tasker by id
#     """
#     tasker = Tasker.query.get(id)
#     print("THIS IS TASKER.ID ", tasker.id)
#     tasker_obj = tasker.to_dict()
#     print("This is Tasker_id ", tasker_obj)
#     task_id = Task.query.get(Task.tasker_id == tasker.id)
#     task_dict = task_id.to_dict()
#     print("This is Task_id ", task_dict)
#     tasker_reviews = Review.query.get(id)
#     # print("THIS IS WHAT WE NEED ", tasker_reviews)
#     res = [task.to_dict() for task in tasker_reviews]
#     return res

@tasker_routes.route('/<int:id>')
def get_tasker(id):
    """
    Gets tasker by id
    """

    tasks = Task.query.filter(Task.tasker_id == id).all()
    task_obj = [task.to_dict() for task in tasks]

    task_id_list = [task["id"] for task in task_obj]
    print("THIS IS TASK_ID_LIST====>",task_id_list)

    review_list = []
    for task_id in task_id_list:
        res = Review.query.filter(Review.task_id == task_id).all()
        res_dict = res[0].to_dict()
        review_list.append(res_dict)
        # print("THIS IS RESSS =====>", res_dict)
    return review_list
