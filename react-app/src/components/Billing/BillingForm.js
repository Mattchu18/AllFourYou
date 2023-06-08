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


const handleSubmit = async (e) =>{
    e.preventDefault()
    card = {
        ...card,
        first_name,
        last_name,
        card_number,
        security_code,
        debit_card
    }
    if (formType ==="Create Card"){
        dispatch(thunkCreateCard(card))
        .then(dispatch(thunkCurrUserCards()))
        history.push('/billing')
    }
}
return(
    <form onSubmit={handleSubmit}>
        <label>
            <input
            type="text"
            value={first_name}
            placeholder="first name"
            onChange={e=> set_first_name(e.target.value)}
            />
        </label>
        <label>
            <input
            type="text"
            value={last_name}
            placeholder="last name"
            onChange={e=> set_last_name(e.target.value)}
            />
        </label>
        <label>
            <input
            type="text"
            value={card_number}
            placeholder="card_number "
            onChange={e=> set_card_number(e.target.value)}
            />
        </label>
        <label>
            <input
            type="text"
            value={security_code}
            placeholder="security code "
            onChange={e=> set_security_code(e.target.value)}
            />
        </label>
        <label>
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
        </label>
        <button type="submit">add new Card</button>
    </form>
)

}
export default BillingForm
