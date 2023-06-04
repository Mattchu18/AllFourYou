import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment } from "react";
import { thunkCurrUserReviews } from '../../store/review'

const GetCurrentReviews = () =>{
    const dispatch = useDispatch()

    const reviews = useSelector(state=> state)
    console.log(reviews)


return(
    <>
    <h1>Inside current suer reviews</h1>
    </>
)
}

export default GetCurrentReviews
