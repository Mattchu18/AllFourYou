import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory} from 'react-router-dom';
import { thunkCreateCard, thunkCurrUserCards } from "../../store/billing";

const BillingForm = ({ card, formType, disabled})=>{
    const dispatch= useDispatch()
    const history = useHistory()

    const [first_name, set_first_name] = useState("")
    const [last_name, set_last_name] = useState("")
    const [card_number, set_card_number] = useState("")
    const [security_code, set_security_code] = useState("")
    const [debit_card, set_debit_card] = useState("")
    const [errors, setErrors] = useState({})


const handleSubmit = async (e) =>{
    e.preventDefault()

  const errorHandling = {}
    if (!first_name) errorHandling.first_name = "First Name is required"
    if(!last_name) errorHandling.last_name = "Last Name is required"
    if(!card_number) errorHandling.card_number = "Card Number is required"
    if(card_number.toString().length != 16) errorHandling.card_number  = "card must be 16 integers long"
    if(isNaN((card_number))) errorHandling.card_number = "Must be integer"
    if(!security_code) errorHandling.security_code = "Security code is required"
    console.log("secutity code .......",security_code.toString())
    if(security_code.toString().length != 3) errorHandling.security_code = "Security code must be 3 integers"
    if(isNaN((security_code))) errorHandling.security_code = "Must be integer"
    if(!debit_card) errorHandling.debit_card = "Please select one"

    setErrors(errorHandling)

    card = {
        ...card,
        first_name,
        last_name,
        card_number,
        security_code,
        debit_card
    }
    if (formType ==="Create Card"){
        if(Object.values(errorHandling).length<1){
        dispatch(thunkCreateCard(card))
        dispatch(thunkCurrUserCards())
        history.push('/billing')
        }

    }
}
return(
    <form onSubmit={handleSubmit}>

            {errors.first_name ? (<p>{errors.first_name}</p>) :null}
        <label>
            <input
            type="text"
            value={first_name}
            placeholder="first name"
            onChange={e=> set_first_name(e.target.value)}
            />
        </label>
  {errors.last_name ? (<p>{errors.last_name}</p>) :null}
        <label>
            <input
            type="text"
            value={last_name}
            placeholder="last name"
            onChange={e=> set_last_name(e.target.value)}
            />
        </label>
 {errors.card_number ? (<p>{errors.card_number}</p>) :null}
        <label>
            <input
            type="text"
            value={card_number}
            placeholder="card_number "
            onChange={e=> set_card_number(e.target.value)}
            />
        </label>
    <break></break>
 {errors.security_code ? (<p>{errors.security_code}</p>) :null}
        <label>
            <div>
         <input

            type="text"
            value={security_code}
            placeholder="security code "
            onChange={e=> set_security_code(e.target.value)}
            />
            </div>

        </label>

 {errors.debit_card ? (<p>{errors.debit_card}</p>) :null}
        <label>
            <div>
                   Debit
            <input
            type="radio"
            value="yes"
            name="debit?"
            onChange={e=> set_debit_card(e.target.value)}
            />
            Credit
                      <input
            type="radio"
            value="no"
            name="debit?"
            onChange={e=> set_debit_card(e.target.value)}
    />
            </div>


        </label>


        <button type="submit">add new Card</button>
    </form>
)

}
export default BillingForm
