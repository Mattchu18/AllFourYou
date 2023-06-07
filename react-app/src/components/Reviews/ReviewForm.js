import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory} from 'react-router-dom';
import { thunkCreateReview, thunkCurrUserReviews, thunkEditReview, thunkOneReview  } from "../../store/review";
import { useModal } from "../../context/Modal";

const ReviewForm = ({review, formType, disabled, tasker})=>{
    const dispatch = useDispatch()
    const history = useHistory()
    // console.log(review)
    const [review_text, setReview_text] = useState(review?.review_text)
    const [star_rating, setStar_rating] = useState(review?.star_rating)
    const [activeRating, setActiveRating] = useState(star_rating)
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()
    

    useEffect(()=>{
        setActiveRating(star_rating)
    },[star_rating])

    const onChange=(number)=>{
        setStar_rating(parseInt(number))
    }

    const handleMouseEnter = index=>{
        if(!disabled){
            setActiveRating(index+1)
        }
    }
    const handleMouseLeave = ()=>{
        if(!disabled){
            setActiveRating(star_rating)
        }
    }
    const handleClick = index =>{
        if(!disabled){
            onChange(index+1)
        }
    }
    let arr = []
        for(let index=0; index<5; index++){
            const className = index<activeRating ? 'fas fa-star': 'far fa-star'
            arr.push(
                <div
                className ={className}
                onMouseEnter={()=>handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={()=>handleClick(index)}>
                    {/* <i className={className}></i> */}
                </div>
            )
        }

    const handleSubmit=async (e)=>{
        e.preventDefault()
        let err = {}
        review = {
            ...review,
            review_text,
            star_rating
        }

        if(review.review_text.length < 5) {
            err.review_text = "Review text needs to be at least 5 characters long"
        }

        if(!review.star_rating) {
            err.star_rating = "Must rate from 1-5"
        }
        
        
        // const findReview = thunkOneReview(review)
        // if (findReview) err.message = "You already have a review for this Tasker!"
        if (formType === "Create Review" && !Object.keys(err).length){
            await dispatch(thunkCreateReview(review))
        }
        
        else if (formType === "Edit Review" && !Object.keys(err).length) {
            await dispatch(thunkEditReview(review))
            .then(closeModal)   
            history.push('/reviews')
            dispatch(thunkCurrUserReviews())
            dispatch(thunkOneReview(review))
        }
        
        if(err) {
            setErrors(err)
            console.log('hi')
        }
        
        }

return (

    <form onSubmit={handleSubmit}>
        <label>
            {/* {errors.message} */}
        </label>
            {errors.review_text}
            <textarea
                type="text"
                value={review_text}
                placeholder="What did you think? Any feedback is helpful."
                onChange={e=> setReview_text(e.target.value)}
            />


        <label>
        {errors.star_rating}
        </label>
        {arr} Stars
        <button type="submit" disabled={!review_text || !star_rating} >Submit your Review</button>


    </form>
)
}

export default ReviewForm
