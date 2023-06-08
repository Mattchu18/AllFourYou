import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkSingleTasker } from "../../store/taskers";
import { thunkAllReviews } from "../../store/review";
import { useParams } from 'react-router-dom';
import CreateReview from "../Reviews/CreateReview";
import OpenModalButton from "../OpenModalButton";

const GetSingleTasker = () => {
    const dispatch = useDispatch()
    const { taskerId } = useParams()
    const singleTasker = useSelector(state => state.tasker.singleTasker[taskerId])
    const allReviews = useSelector(state => state.review.allReviews)
    const allReviewsArr = Object.values(allReviews)
    const currUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(thunkSingleTasker(taskerId))
        dispatch(thunkAllReviews())
    }, [dispatch, taskerId])
    const allTaskerRev = allReviewsArr.filter(review => review.tasker_id === parseInt(taskerId))
    const checkReviews = []
    
    if(!singleTasker) return "This tasker does not exist"
    allTaskerRev.forEach(rev => checkReviews.push(rev.user_id))
    return (
        <>
            {currUser ? ((checkReviews.includes(currUser.id))) ? null :
            <OpenModalButton
            buttonText='Post Your Review'
            modalComponent={<CreateReview tasker={singleTasker}/>}
                        /> 
                        : null}
                        <div>
                        {singleTasker.available}
                        </div>
                        <div>
                        {singleTasker.bio}
                        </div>
                        <div>
                        {singleTasker.city}
                        </div>
                        <div>
                        {singleTasker.email}
                        </div>
                        <div>
                        {singleTasker.first_name}
                        </div>
                        <div>
                        {singleTasker.last_name}
                        </div>
                        <div>
                        {singleTasker.phone_number}
                        </div>
                        <div>
                        {singleTasker.profile_image}
                        </div>
                        <div>
                        {singleTasker.tools}
                        </div>
                        <div>
                        {singleTasker.vehicles}
                        </div>

                        <br></br>
            <div>
                {allTaskerRev.map(rev => {
                    return (
                        <>
                        <div>
                            {rev.star_rating}
                        </div>
                        <div>
                        {rev.review_text}
                        </div>
                        </>
                    )
                })}
            </div>


        </>
    )
}

export default GetSingleTasker