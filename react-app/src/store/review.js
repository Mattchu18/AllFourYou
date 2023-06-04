// import { csrfFetch } from "./csrf";
const GET_ALL_REVIEWS="review/loadCurrUserReviews"

const loadCurrUserReviews=(userId) =>({
    type: GET_ALL_REVIEWS,
    userId
})

export const thunkCurrUserReviews=()=> async(dispatch)=>{
    const response = await fetch('/api/reviews/currentUser')
    if(response.ok){
        const data = await response.json()
        dispatch(loadCurrUserReviews(data))

    }
}
const initialState = { allReviews:{}, currentUserReviews:{}}
const reviewsReducer = (state = initialState, action)=>{
    let newState;

    switch(action.type){
        case GET_ALL_REVIEWS:
            newState={...state}
            action.reviews.forEach(review=>{
                newState.allReviews[review.id]=review
            })
            return newState

        default: return state
    }
}
export default reviewsReducer;
