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
    const { closeModal } = useModal()
    

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
