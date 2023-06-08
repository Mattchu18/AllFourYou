import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment } from "react";
import { thunkCurrUserCards } from '../../store/billing'
import thunk from "redux-thunk";

const GetCurrentCards = () =>{
    console.log("in curr user component")
    const dispatch = useDispatch()
    const billings = useSelector(state =>state.billing.currentUserCards)
    console.log("billings=====>", billings)
    
    const billingsArr = Object.values(billings)
    useEffect(()=>{
        dispatch(thunkCurrUserCards())
    }, [dispatch])

    if(!billings){
        return "loading.."
    }
return(
    <>
   {billingsArr.map((billing)=>(
    <>
    <div>{billing.first_name}, {billing.last_name}</div>
    {console.log(billing.card_number)}
    <div>card ending in: {(billing.card_number).toString().slice(12,16)}</div>
    </>
   ))}
    </>
)

}
export default GetCurrentCards;
