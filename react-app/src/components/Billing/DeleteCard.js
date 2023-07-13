import { useHistory } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { thunkDeleteCard, thunkCurrUserCards } from '../../store/billing';
import { useModal } from "../../context/Modal";

const DeleteCard = ({card}) =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    const handleDelete= async (e)=>{
        e.preventDefault();

        await dispatch(thunkDeleteCard(card.id))
        .then(closeModal)
        dispatch(thunkCurrUserCards)
        history.push('/billing')
    }
    return(
        <>
        <div>
        <div>
        <h2>Confirm Delete</h2>
        </div>
        <p>Are you sure you want to remove this card?</p>
        <div>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={closeModal}>No, keep card</button>
        </div>
        </div>
        </>
    )
}
export default DeleteCard;
