import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import { thunkDeleteReview, thunkCurrUserReviews, thunkOneReview } from '../../store/review';

const DeleteReview = ({ review }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    console.log(" I AM IN MY DELETE COMP",review)
    const handleDelete = e => {
        // e.preventDefault()
        dispatch(thunkDeleteReview(review))
        .then(closeModal)
        dispatch(thunkCurrUserReviews())
        // dispatch(thunkOneReview(review))
        history.push('/reviews')
    }

    return (
        <>
        <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this Review?</p>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={closeModal}>Cancel</button>
        </>
    )

}

export default DeleteReview