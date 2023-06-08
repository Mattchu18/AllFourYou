import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { thunkCreateBooking } from "../../store/booking";
import thunk from "redux-thunk";
// import { thunkCreateReview, thunkEditReview  } from "../../store/review";

const BookingForm = ({newBooking, formType}) => {
    const dispatch = useDispatch()

    const [category, setCategory] = useState("")
    const [city, setCity] = useState("")
    const [duration, setDuration] = useState("")
    const [details, setDetails] = useState("")
    const [errors, setErrors] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const booking = {
            ...newBooking,
            category,
            city,
            duration,
            details

        }
        if (formType==="Create Booking") {
            dispatch(thunkCreateBooking(booking))
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit}>

                <select>
                    <option value="Breeding">
                        Breeding
                    </option>
                    <option value="Matchmaking">
                        Matchmaking
                    </option>
                    <option value="Cooking">
                        Cooking
                    </option>
                    <option value="Dancing">
                        Dancing
                    </option>

                </select>
                <select>
                    <option value="San Francisco">
                        San Francisco
                    </option>
                    <option value="Los Angeles">
                        Los Angeles
                    </option>

                    <option value="Miami">
                        Miami

                    </option>

                    <option value="Toronto">
                        Toronto

                    </option>
                    <option value="Joshua Tree">
                        Joshua Tree

                    </option>
                </select>
                <input
                    type="radio"
                    value="short"
                    name="duration"
                />
                <label>
                    Short - Est. 1hr
                </label>
                <input
                    type="radio"
                    value="short"
                    name="duration"
                />
                <label>
                    Medium - Est. 2-3 hrs
                </label>
                <input
                    type="radio"
                    value="short"
                    name="duration"

                />
                <label>
                    Long - Est. 4+ hrs
                </label>
                <textarea
                    type="text"
                    placeholder="Please leave a review"
            
                />

                <button type="submit">Submit</button>
            </form>

        </>
    )
}
export default BookingForm
