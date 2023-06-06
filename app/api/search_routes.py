from flask import Blueprint, redirect, request
from ..models.db import db
from ..models.task import Task
from ..models.tasker import Tasker

search_routes = Blueprint("search", __name__, url_prefix="")

@search_routes.route("/")
def search_taskers():

    query = request.args.get('query')
    print("query===============", query)
    if not query:
        return {"message": "Sorry, no results found"}
    else:

        results = Tasker.query.filter(Tasker.city.ilike(f'%{query}%')).all()
        print("RESULTS------------->", Tasker)
        results_list = [result.to_dict() for result in results]
        return {"results": results_list}
