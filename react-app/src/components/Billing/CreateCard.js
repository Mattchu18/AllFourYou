import BillingForm from "./BillingForm";


const CreateCard = () =>{
    const newCard = {
        first_name:"",
        last_name:"",
        card_number:"",
        security_code:"",
        debit_card:""
    }
    return(
        <BillingForm
        newCard={newCard}
        formType="Create Card"
        />
    )
}

export default CreateCard;
