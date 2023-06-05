import { thunkOneReview } from "../../store/review";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment } from "react";
import { useParams } from 'react-router-dom';

const GetOneReview = () => {
    const dispatch = useDispatch()
    const {reviewId} = useParams()
    const review = useSelector(state => state.review.singleReview)

    useEffect(() => {
        dispatch(thunkOneReview(reviewId))
    }, [dispatch, reviewId])
    if(!review) return "no reviews by that id"

    return (
        <>
        <div>
        {review?.star_rating}
        </div>
        <div>
        {review?.review_text}   
        </div>
        {review?.id}
        </>
    )
}
 // i don't think we need this tbh
export default GetOneReview