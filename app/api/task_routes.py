from flask import Blueprint
from ..models.task import Task

task_routes = Blueprint("task", __name__,url_prefix='')

@task_routes.route("/all")
def get_all_tasks():
    """
    This route will get all tasks regardless of being logged in
    """
    all_tasks_obj = Task.query.all()
    all_tasks = [tasks.to_dict() for tasks in all_tasks_obj]
    return all_tasks


