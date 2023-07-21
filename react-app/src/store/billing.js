const GET_CURRENT_CARDS = "billing/getallcards"
const CREATE_CARD = "billing/createCard"
const DELETE_CARD = "billing/deleteCard"

const loadCurrUserCards = (cards)=>({
    type: GET_CURRENT_CARDS,
    cards
})
const createCard = (card)=>({
    type: CREATE_CARD,
    card
})
const deleteCard = (cardId)=>({
    type: DELETE_CARD,
    cardId
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
    } else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const thunkDeleteCard = (cardId)=> async dispatch=>{
    const response = await fetch(`/api/billing/delete/${cardId}`, {
        "method": "DELETE"
    })
    if (response.ok){
        dispatch(deleteCard(cardId))
    }
}

const initialState = { currentUserCards:{}}
const billingsReducer= (state = initialState, action)=>{
    switch(action.type){
        case GET_CURRENT_CARDS:{
            const newState = {}
            const allBookings = action.cards
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
        case DELETE_CARD:{
            const newState={
                ...state, currentUserCards:{...state.currentUserCards}
            }
            delete newState.currentUserCards[action.cardId]
            return newState
        }
    default:return state
    }

}
export default billingsReducer
