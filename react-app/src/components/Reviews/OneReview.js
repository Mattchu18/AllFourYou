import { thunkOneReview } from "../../store/review";
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { useParams } from 'react-router-dom';

const GetOneReview = () => {
    const dispatch = useDispatch()
    const {reviewId} = useParams()
    const review = useSelector(state => {
        return state.review.singleReview[reviewId]
    })

    useEffect(() => {
        dispatch(thunkOneReview(review))
    }, [dispatch])


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
export default GetOneReview