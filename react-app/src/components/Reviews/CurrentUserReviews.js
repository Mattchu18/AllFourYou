import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment } from "react";
import { thunkCurrUserReviews } from '../../store/review';
import OpenModalButton from "../OpenModalButton";
import DeleteReview from "./DeleteReview";
import EditReview from "./EditReview";

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
       <ul className="review-container">
        {Object.values(reviews).map(review=>{
            return (
                <>
                <div className="review">

                <div className="star-rating-container">
                    <i className="fas fa-star"></i>
                    {review?.star_rating}

                </div>
                <div className="review-body">
                    {review?.review_text}
                </div>
                </div>
                <div className="buttons-div">
                <div  className="single-button">
                <OpenModalButton
                buttonText='Edit'
                modalComponent={<EditReview review={review} />}
                />
                </div>
                <div  className="single-button">
                <OpenModalButton
                className="one-button"
                buttonText='Delete'
                modalComponent={<DeleteReview review={review}/>}
                />
                </div>
                </div>
                </>
            )
        })}
       </ul>
    </div>
)
}

export default GetCurrentReviews
