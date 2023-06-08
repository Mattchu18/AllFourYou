
import ReviewForm from './ReviewForm'
import { useParams } from 'react-router-dom'

const CreateReview=({tasker})=>{
  // const { taskerId } = useParams()
    const review = {
      review_text: "",
      star_rating: "",
      tasker_id: tasker.id
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
