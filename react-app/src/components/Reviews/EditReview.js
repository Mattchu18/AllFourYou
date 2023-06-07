import ReviewForm from './ReviewForm'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {thunkOneReview} from '../../store/review'
import { useEffect } from 'react';

const EditReview = () => {

    const dispatch = useDispatch()
    const { reviewId } = useParams()
    const review = useSelector(state => state.review.singleReview[reviewId])
    useEffect(() => {
        dispatch(thunkOneReview(reviewId))
    }, [dispatch, reviewId])

    if(!review) return "no reviews by that id"

    return (
        <>
            <ReviewForm
            review={review}
            formType="Edit Review"
            // disabled={disabled}
            />
        </>
    )
}

export default EditReview
