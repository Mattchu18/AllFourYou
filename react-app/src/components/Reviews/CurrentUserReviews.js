import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment } from "react";
import { thunkCurrUserReviews } from '../../store/review'

const GetCurrentReviews = () =>{
    const dispatch = useDispatch()

    const reviews = useSelector(state=> state.review.currentUserReviews)
    console.log("THIS IS REVIEWS====>", reviews)

    useEffect(()=>{
        dispatch(thunkCurrUserReviews())
    }, [dispatch])

console.log(reviews)
if(!reviews) return "loading.."
return(
    <div>
       <h2>Manage reviews</h2>
       <ul>
        {Object.values(reviews).map(review=>{
            return (
                <>
                <div>
                    {review?.star_rating}
                </div>
                <div>
                    {review?.review_text}
                </div>

                </>
            )
        })}
       </ul>
    </div>
)
}

export default GetCurrentReviews
import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment } from "react";
import { thunkCurrUserReviews } from '../../store/review'

const GetCurrentReviews = () =>{
    const dispatch = useDispatch()

    const reviews = useSelector(state=> state.review.currentUserReviews)
    console.log("THIS IS REVIEWS====>", reviews)

    useEffect(()=>{
        dispatch(thunkCurrUserReviews())
    }, [dispatch])

console.log(reviews)
if(!reviews) return "loading.."
return(
    <div>
       <h2>Manage reviews</h2>
       <ul>
        {Object.values(reviews).map(review=>{
            return (
                <>
                <div>
                    {review?.star_rating}
                </div>
                <div>
                    {review?.review_text}
                </div>

                </>
            )
        })}
       </ul>
    </div>
)
}

export default GetCurrentReviews
