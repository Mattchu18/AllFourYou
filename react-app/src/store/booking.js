const GET_ALL_BOOKINGS = 'bookings/getAllBookings'

const getAllBookingsAction = bookings =>({
    type: GET_ALL_BOOKINGS,
    bookings
})


export const thunkCurrentUserBookings = ()=> async dispatch =>{
    const response = await fetch('/api/bookings/all')
    if(response.ok){
        const data = await response.json()
        dispatch(getAllBookingsAction(data))
    }
}

const initialState = { currentUserBookings: {} }
const bookingReducer = (state = initialState, action )=>{
    switch(action.type){
        case GET_ALL_BOOKINGS:{
            const newState={}
            const allBookings = action.bookings
            allBookings.forEach(booking=>{
                newState[booking.id]=booking
            })
            return {
                ...state, currentUserBookings: newState
        }
        }
        default: return state
    }
}

export default bookingReducer
