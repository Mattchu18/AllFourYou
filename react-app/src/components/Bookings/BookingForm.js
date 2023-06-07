import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { thunkCreateBooking, thunkEditBooking } from "../../store/booking";
import thunk from "redux-thunk";
// import { thunkCreateReview, thunkEditReview  } from "../../store/review";

const BookingForm = ({ booking, formType }) => {
    const dispatch = useDispatch()

    const [category, setCategory] = useState(booking?.category)
    const [city, setCity] = useState(booking?.city)
    const [duration, setDuration] = useState(booking?.duration)
    const [details, setDetails] = useState(booking?.details)
    const [errors, setErrors] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        booking = {
            ...booking,
            category,
            city,
            duration,
            details

        }
        if (formType === "Create Booking") {
            dispatch(thunkCreateBooking(booking))
        }

        if (formType === "Edit Booking") {
            console.log("AM I IN HERE =====>", booking)
            dispatch(thunkEditBooking(booking))
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                {formType === "Edit Booking" ? (<h2>Edit your Booking</h2>) : null}
                {formType === "Create Booking" ? (<select onChange={e => setCategory(e.target.value)}>
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

                </select>) : (<p>you are editing so no category for you</p>)}

                {formType === "Create Booking" ? (<select onChange={e => setCity(e.target.value)}>
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
                </select>) : (<p>you are editing so no city for you</p>)}
                <div>
                    <h3>
                        Select a Duration
                    </h3>
                    <input
                        type="radio"
                        value="short"
                        name="duration"
                        checked={duration === "short"}
                        onChange={e => setDuration(e.target.value)}
                    />
                    <label>
                        Short - Est. 1hr
                    </label>
                    <input
                        type="radio"
                        value="medium"
                        name="duration"
                        checked={duration === "medium"}
                        onChange={e => setDuration(e.target.value)}

                    />
                    <label>
                        Medium - Est. 2-3 hrs
                    </label>
                    <input
                        type="radio"
                        value="long"
                        name="duration"
                        checked={duration === "long"}
                        onChange={e => setDuration(e.target.value)}

                    />
                    <label>
                        Long - Est. 4+ hrs
                    </label>
                </div>

                <div>
                    <h3>
                        Task Details
                    </h3>
                    <textarea
                        type="text"
                        placeholder="Please write something about your task!"
                        value={details}
                        onChange={e => setDetails(e.target.value)}
                    />
                </div>

                <button type="submit">Submit</button>
            </form>

        </>
    )
}
export default BookingForm
