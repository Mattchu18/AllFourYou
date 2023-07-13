import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { thunkCurrUserCards } from '../../store/billing'
import DeleteCard from '../../components/Billing/DeleteCard'
import OpenModalButton from "../OpenModalButton";
import CreateCard from "./CreateCard"
import "./display_card.css"
import { useModal } from '../../context/Modal';


const GetCurrentCards = () =>{
    const dispatch = useDispatch()
    const billings = useSelector(state =>state.billing.currentUserCards)
    const {setModalContent}=useModal()

    const billingsArr = Object.values(billings)
    useEffect(()=>{
        dispatch(thunkCurrUserCards())
    }, [dispatch])

    if(!billings){
        return "loading.."
    }

    const openModal = (modalComponent) => {
        setModalContent(modalComponent);
      };
    
return(
    <>
        <h1>Saved cards</h1>
    <div className="card_container">
    <div className="card button-container" onClick={()=>openModal(<CreateCard/>)} >
        <div className="add_button">+ Add Payment Card</div>
    </div>
   {billingsArr.map((billing)=>(
       <div key={billing.id} className="card">
        <div className="debit_credit">
            {billing.debit_card==="yes" && <div>DEBIT</div>}
            {billing.debit_card==="no" && <div>CREDIT</div>}
        </div>
        <div className="card-header">
    <div className="card_ending"> <div className="dots">····  ····  ···· </div>{(billing.card_number).toString().slice(12,16)}</div>
        </div>
            <div className="card-body">

    <div className="card_name">{billing.first_name}, {billing.last_name}</div>
            
            </div>
        <OpenModalButton
        buttonText="Delete Card"
        modalComponent={<DeleteCard
            card = {billing}
            />}
            
            />


    </div>
   ))}



    </div>
   </>
)

}
export default GetCurrentCards;
