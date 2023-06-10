import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment } from "react";
import { thunkCurrUserReviews } from '../../store/review';
import OpenModalButton from "../OpenModalButton";
import DeleteReview from "./DeleteReview";
import EditReview from "./EditReview";
import "./current_user_review.css"

const GetCurrentReviews = () =>{
    const dispatch = useDispatch()

    const reviews = useSelector(state=> state.review.currentUserReviews)
    console.log("THIS IS REVIEWS====>", reviews)


    useEffect(()=>{
        dispatch(thunkCurrUserReviews())
    }, [dispatch])

    // display star rating by rating number
const starDisplay=(star_rating)=>{
    const starsArr=[]
    for(let i=0;i<star_rating;i++){
        starsArr.push(<i className="fas fa-star" ></i>)
    }
    return starsArr
}
// display average rating
let totalReviews=0
let totalRating=0
Object.values(reviews).forEach((review)=>{
    totalRating+=review.star_rating
    totalReviews++
})

const averageRating= totalRating/totalReviews


if(!reviews) return "loading.."
return(
    <div>
       <h2>Manage your reviews</h2>
       <div>
        <div className="review-averages">
            <div>
                Average <i className="fas fa-star" ></i>({averageRating.toFixed(1)}) 
                </div>
                <div>

            Total <i className="fas fa-comment-dots"></i> ({totalReviews})
                </div>
        </div>
        
       </div>
       <div className="review-card-container">

        {Object.values(reviews).map(review=>{
            return (
                <div className="review-container">
                <>
                <div className="review">

                <div className="star-rating-container">
                {starDisplay(review?.star_rating)}
                 

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
        </div>
            )
        })}
        </div>
       </div>
)
}

export default GetCurrentReviews
