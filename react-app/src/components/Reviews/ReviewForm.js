import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory} from 'react-router-dom'

const ReviewForm = ({review, formType})=>{
    const dispatch = useDispatch()
    const history = useHistory()

    const [reviewText, setReviewText] = useState(review?.reviewText)
    const [starRating, setStarRating] = useState(star?.starRating)
    const [errors, setErrors] = useState({})

const handleSubmit=async (e)=>{
    e.preventDefault()

    review = {
        ...review,
        reviewText,
        starRating
    }

// if (formType === "Create Review"){
    //     return null
    // }
    // if (formType ==="")
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


}

return (

    <form onSubmit={handleSubmit}>
        <label>
        </label>
            <textarea
                type="text"
                value={reviewText}
                placeholder="What did you think? Any feedback is helpful."
                onChange={e=> setReviewText(e.target.value)}
            />


        <label>

        </label>
        {arr} Stars
        <button className="star-submit" type="submit" disabled={(review.length<10 || stars===-0)}>Submit your Review</button>


    </form>
)
}

export default ReviewForm
