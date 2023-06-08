const GET_CURRENT_CARDS = "billing/getallcards"
const CREATE_CARD = "billing/createCard"
const DELETE_CARDS = "billing/deleteCard"

const loadCurrUserCards = (cards)=>({
    type: GET_CURRENT_CARDS,
    cards
})
const createCard = (card)=>({
    type: CREATE_CARD,
    card
})


export const thunkCurrUserCards=()=>async(dispatch)=>{
    const response = await fetch('/api/billing/')
    if(response.ok){
        const data = await response.json()
        dispatch(loadCurrUserCards(data))
    }
}
export const thunkCreateCard = (card)=> async dispatch =>{
    const response = await fetch('/api/billing/new', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(card)
    })
    if(response.ok){
        const data = await response.json()
        dispatch(createCard(data))
    }
}
const initialState = { currentUserCards:{}}
const billingsReducer= (state = initialState, action)=>{
    switch(action.type){
        case GET_CURRENT_CARDS:{
            const newState = {}
            const allBookings = action.cards
            console.log("allbookings", allBookings)
            allBookings.forEach(card=>{
                newState[card.id]= card
            })
            return {
                ...state, currentUserCards:newState
            }
        }
        case CREATE_CARD:{
            const newState={}
            const newCard = action.card
            newState[newCard.id]=newCard
            return {
                ...state, currentUserCards:{[newCard.id]: newCard}

            }
        }
    default:return state
    }

}
export default billingsReducer
