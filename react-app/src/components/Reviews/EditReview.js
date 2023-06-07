import ReviewForm from './ReviewForm'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {thunkCurrUserReviews, thunkEditReview, thunkOneReview} from '../../store/review'
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useModal } from "../../context/Modal";

const EditReview = ({ review }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    // const { reviewId } = useParams()
    const { closeModal } = useModal()
    // const reviewRev = useSelector(state => state.review.singleReview[review.id])

    // useEffect(() => {
    //     dispatch(thunkOneReview(review))
    //     dispatch(thunkCurrUserReviews())
    //     history.push('/reviews')
    // }, [dispatch, review.id])
    // const handleEdit = e => {
    //     e.preventDefault()
    //     dispatch(thunkEditReview(review))
    //     .then(closeModal)
    //     history.push('/reviews')
    //     dispatch(thunkCurrUserReviews)
    // }

    // if(!review) return "no reviews by that id"

    return (
        <>
            {/* <h1>Confirm Edit</h1>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={closeModal}>Cancel</button> */}
            <ReviewForm
            review={review}
            formType="Edit Review"
            // disabled={disabled}
            />
        </>
    )
}

export default EditReview
