
import ReviewForm from './ReviewForm'
import { useParams } from 'react-router-dom'

const CreateReview=({taskerId})=>{
  // const { taskerId } = useParams()
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
