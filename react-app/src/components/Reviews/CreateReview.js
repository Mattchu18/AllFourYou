import ReviewForm from './ReviewForm'
import './Reviews.css'

const CreateReview=({taskerId})=>{
    const review = {
      review_text: "",
      star_rating: "",
      tasker_id: taskerId
    }

    return(
        <>
          <ReviewForm
            review={review}
            formType="Create Review"
          />
        </>
    )

}

export default CreateReview
