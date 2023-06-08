from flask import Blueprint, jsonify, request
from app.models.billing import Billing
from flask_login import login_required, current_user
from app.models import User
from app.models.db import db
from app.forms.billing_form import BillingForm


billing_routes=Blueprint("billing",__name__)

def validation_errors_message(validation_errors):
    """
    returns wtf validation errors
    """
    errorMessages=[]
    for field in validation_errors:
        for error in validation_errors(field):
            errorMessages.append(f'{field}: {error}')

    return errorMessages

@billing_routes.route('/')
@login_required
def get_current_billing():
    """
    Gets all billing options of the current user
    """
    all_billings= Billing.query.filter(Billing.user_id==current_user.id).all()#get billing info that matche
    billings_arr = [billing.to_dict() for billing in all_billings]
    # print("billing=======>", billing_obj)
    return billings_arr

@billing_routes.route('/new', methods=["POST"])
@login_required
def post_billing():
    """
    Post a new billing
    """
    form = BillingForm()

    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():

        current_card = Billing.query.filter(Billing.user_id == current_user.id, Billing.card_number == form.data["card_number"]).first()

        if current_card:
            return "Card number exists. Please enter a new card number"

        new_billing = Billing(
            first_name = form.data["first_name"],
            last_name=form.data["last_name"],
            card_number=form.data["card_number"],
            security_code=form.data["security_code"],
            debit_card=form.data["debit_card"],
            user_id = current_user.id
        )
        db.session.add(new_billing)
        db.session.commit()
        return new_billing.to_dict()
    return {'errors': validation_errors_message(form.errors)}, 401


@billing_routes.route('/delete/<int:id>', methods=["DELETE"])
@login_required
def delete_billing(id):
    """
    Current user is able to delete billing by id
    """
    selected_card = Billing.query.get(id)
    if not selected_card:
        return "This Card does not exist"

    elif current_user.id == selected_card.user_id:
        db.session.delete(selected_card)
        db.session.commit()
        return "Successfully Deleted"
    return "This card does not belong to you."
