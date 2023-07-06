import ReviewForm from './ReviewForm'
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom'
import { useModal } from "../../context/Modal";


const EditReview = ({ review }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    

    return (
        <>
            <ReviewForm
            review={review}
            formType="Edit Review"
            />
        </>
    )
}

export default EditReview
