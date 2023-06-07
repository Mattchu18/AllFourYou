from flask import Blueprint, jsonify, request
from app.models.billing import Billing
from flask_login import login_required, current_user
from app.models import User
from app.models.db import db
from app.forms.billing_form import BillingForm


billing_routes=Blueprint("billing",__name__)

@billing_routes.route('/')
@login_required
def get_current_billing():
    """
    Gets all billing options of the current user
    """
    all_billings= Billing.query.filter(Billing.user_id==current_user.id).all()#get billing info that matche
    billing_obj ={}
    for bill in all_billings:

        billing_obj[bill.id]=bill.to_dict()

    print("billing=======>", billing_obj)
    return billing_obj


