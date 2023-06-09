from flask import Blueprint, redirect, request, Markup
from ..models.db import db
from ..models.task import Task
from ..models.tasker import Tasker

search_routes = Blueprint("search", __name__)

#highlight

@search_routes.route("/")
def search_taskers():

    query = request.args.get('query')
    print("query===============", query)
    if not query:
        return {"message": "Please enter a search"}
    else:
        results_id = Tasker.query.filter(Tasker.id.ilike(f'%{query}%')).all()
        results_city = Tasker.query.filter(Tasker.city.ilike(f'%{query}%')).all()
        results_bio = Tasker.query.filter(Tasker.bio.ilike(f'%{query}%')).all()
        results_phone = Tasker.query.filter(Tasker.phone_number.ilike(f'%{query}%')).all()
        results_email = Tasker.query.filter(Tasker.email.ilike(f'%{query}%')).all()
        results_category = Task.query.filter(Task.category.ilike(f'%{query}%')).all()
        results_description = Task.query.filter(Task.description.ilike(f'%{query}%')).all()

        unique_set=set()

        results_list=[]

        tasker_results = results_id + results_city + results_bio + results_phone + results_email
        task_results =results_category + results_description

        for tasker in tasker_results:
            tasker_data = {
                'id': tasker.id,
                'url':tasker.profile_image,
                'firstName': tasker.first_name,
                'lastName':tasker.last_name,
                'price': tasker.hourly_rate,
                'vehicles': tasker.vehicles,
                'tools': tasker.tools,
                'bio': tasker.bio,
                'city': tasker.city,
                'email': tasker.email,
                'phone':tasker.phone_number,
                'profile_image': tasker.profile_image,
                #include first_name, last_name
            }

            tasker_id = tasker.id
            print(tasker_id, "TASKER ID BEFORE IFFFFFFF`````````")
            print(unique_set, "<===========unique set")
            if tasker_id not in unique_set:

                tasker_tasks = Task.query.filter(Task.tasker_id==tasker_id).all()
                print("taksers", tasker_tasks)
                task_list = []
                for task in tasker_tasks:
                    task_data = {
                        'category': task.category,
                        'description': task.description,

                    }
                    task_list.append(task_data)

                tasker_data['tasks'] = task_list
                results_list.append(tasker_data)
                unique_set.add(tasker_id)
        for task in task_results:
            tasker = Tasker.query.get(task.tasker_id)
            if tasker.id not in unique_set:
                tasker_data = {
                    'id': tasker.id,
                    'url':tasker.profile_image,
                    'bio': tasker.bio,
                    'firstName': tasker.first_name,
                    'lastName':tasker.last_name,
                    'price': tasker.hourly_rate,
                    'vehicles': tasker.vehicles,
                    'tools': tasker.tools,
                    'city': tasker.city,
                    'email': tasker.email,
                    'phone': tasker.phone_number,
                    'profile_image': tasker.profile_image,
                }

                task_data = {
                    'category': task.category,
                    'description': task.description,
                }

                tasker_data['tasks'] = [task_data]
                results_list.append(tasker_data)
                unique_set.add(tasker.id)
        return {"results": results_list}
