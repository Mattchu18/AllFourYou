
import ReviewForm from './ReviewForm'

const CreateReview=()=>{
    const review = { reviewText: "", starRating: ""}

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
