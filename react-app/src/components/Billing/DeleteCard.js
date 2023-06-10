import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkDeleteCard, thunkCurrUserCards } from '../../store/billing';
import { useModal } from "../../context/Modal";

const DeleteCard = ({card}) =>{
    console.log("CARD inside the delete component", card)
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    const handleDelete= async (e)=>{
        e.preventDefault();
        console.log("CARD inside the delete befirs", card.id)

        await dispatch(thunkDeleteCard(card.id))
        .then(closeModal)
        dispatch(thunkCurrUserCards)
        history.push('/billing')
        console.log("CARD inside the delete after", card.id)

    }
    return(
        <>
        <div>
        <div>
        <h2>Confirm Delete</h2>
        </div>
        <p>Are you sure you want to remove this card?</p>
        <div>
        <button className='cardButt' onClick={handleDelete}>Delete</button>
        <button className='cardButt' onClick={closeModal}>No, keep card</button>
        </div>
        </div>
        </>
    )
}
export default DeleteCard;
