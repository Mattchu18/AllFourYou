import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkDeleteCard } from '../../store/billing';

const DeleteCard = ({card}) =>{
    console.log("CARD inside the delete component", card)
    const dispatch = useDispatch()
    const history = useHistory()
    const handleDelete= async (e)=>{
        e.preventDefault();
        console.log("CARD inside the delete befirs", card.id)

        await dispatch(thunkDeleteCard(card.id))
        console.log("CARD inside the delete after", card.id)

    }
    return(
        <>
        <button onClick={handleDelete}>Delete</button>
        </>
    )
}
export default DeleteCard;
