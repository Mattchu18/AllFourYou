import ReviewForm from './ReviewForm'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {thunkEditReview} from '../../store/review'
import { useEffect } from 'react';

const EditReview = () => {

    console.log("HIIIIIII")
    const dispatch = useDispatch()
    const {reviewId} = useParams()
    // const review = useSelector(state=> state.review)


    const review = useSelector(state => state.review)
    console.log("THIS IS REVIEW IN EDIT REVIEW", review)
    // useEffect(() => {
    //     dispatch(thunkEditReview(review, reviewId))
    // }, [review, reviewId])

    // if(!review) return <h1>REVIEW IS NOT FOUND</h1>

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
