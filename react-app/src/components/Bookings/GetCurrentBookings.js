import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment } from "react";
import { thunkCurrentUserBookings } from "../../store/booking";

const GetCurrentBookings = () =>{
    const dispatch = useDispatch()

    const bookingsObj = useSelector(state=>state.booking.currentUserBookings)

    const bookingsArr = Object.values(bookingsObj)
console.log("This is state in bookings", bookingsArr)
    useEffect(() =>{
        dispatch(thunkCurrentUserBookings())
    }, [dispatch])

return(
<>
{bookingsArr.map(booking=>(
     <h2>{booking.id}</h2>
))}
</>
)
}
export default GetCurrentBookings
