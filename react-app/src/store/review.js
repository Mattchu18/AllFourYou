// import { csrfFetch } from "./csrf";
const GET_ALL_REVIEWS="review/loadCurrUserReviews"

const loadCurrUserReviews=(reviews) =>({
    type: GET_ALL_REVIEWS,
    reviews
})

export const thunkCurrUserReviews=()=> async(dispatch)=>{
    const response = await fetch('/api/reviews/currentUser')
    console.log("RESPONSE IN THUNK=====>", response)

    if(response.ok){
        const data = await response.json()
        dispatch(loadCurrUserReviews(data))

    }
}
const initialState = { currentUserReviews:{}}
const reviewsReducer = (state = initialState, action)=>{
    let newState;

    switch(action.type){
        case GET_ALL_REVIEWS:
            newState={...state, currentUserReviews: {}}
            action.reviews.forEach(review=>{
                newState.currentUserReviews[review.id]=review
            })
            console.log("THIS IS after ITERATING=======>", newState)
            return newState

        default: return state
    }
}
export default reviewsReducer;
