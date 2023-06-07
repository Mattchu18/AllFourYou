import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory} from 'react-router-dom';
import { thunkCreateReview, thunkEditReview  } from "../../store/review";

const ReviewForm = ({review, formType, disabled, tasker})=>{
    const dispatch = useDispatch()
    const history = useHistory()
    // console.log(review)
    const [review_text, setreview_text] = useState(review?.review_text)
    console.log("CAN I KNOW WHAT THIS IS PLEASE", review?.review_text)
    const [star_rating, setstar_rating] = useState(review?.star_rating)
    const [activeRating, setActiveRating] = useState(star_rating)
    const [errors, setErrors] = useState({})

    useEffect(()=>{
        setActiveRating(star_rating)
    },[star_rating])

    const onChange=(number)=>{
        setstar_rating(parseInt(number))
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
        review = {
            ...review,
            review_text,
            star_rating
        }
        console.log("WHAT AM I LOOKING AT THO", review)
        if (formType === "Create Review"){
            dispatch(thunkCreateReview(review))
        }

        else if (formType === "Edit Review") {
            dispatch(thunkEditReview(review))
        }

        }

return (

    <form onSubmit={handleSubmit}>
        <label>
        </label>
            <textarea
                type="text"
                value={review_text}
                placeholder="What did you think? Any feedback is helpful."
                onChange={e=> setreview_text(e.target.value)}
            />


        <label>

        </label>
        {arr} Stars
        <button type="submit" >Submit your Review</button>


    </form>
)
}

export default ReviewForm
