import React from 'react';
import { useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import { thunkDeleteReview, thunkCurrUserReviews} from '../../store/review';

const DeleteReview = ({ review }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    const handleDelete = e => {
        dispatch(thunkDeleteReview(review))
        .then(closeModal)
        dispatch(thunkCurrUserReviews())
        history.push('/reviews')
    }

    return (
        <>
        <div>
            <div>
        <h1 className='reviewTitle'>Confirm Delete</h1>
            </div>
            <p>Are you sure you want to delete this Review?</p>
            <div>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={closeModal}>Cancel</button>
            </div>
        </div>
        </>
    )

}

export default DeleteReview