import ReviewForm from './ReviewForm'
import { useDispatch, useSelector } from 'react-redux';

const EditReview = () => {
    // const { reviewId } = useParams()
    const dispatch = useDispatch()
    const review = useSelector(state => state.review.currUserReviews[reviewId])

    // useEffect(() => {
    //     dispatch()
    // })

    if(!review) return <h1>REVIEW IS NOT FOUND</h1>

    return (
        <>
            <ReviewForm
            review={review}
            formType="Edit Review"
            disabled={disabled}
            />
        </>
    )
}

export default EditReview