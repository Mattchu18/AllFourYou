
import ReviewForm from './ReviewForm'
import { useParams } from 'react-router-dom'

const CreateReview=()=>{
  const { taskerId } = useParams()
  console.log(taskerId)
    const review = {
      review_text: "",
      star_rating: "",
      tasker_id: taskerId
    }

    console.log("HELLO FROM CREATE REVIEW FORM")
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
