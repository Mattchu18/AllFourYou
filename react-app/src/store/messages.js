const GET_ALL_MESSAGES = 'messages/GET_ALL_MESSAGES'
const GET_USER_MESSAGES = 'messages/GET_USER_MESSAGES'
const CREATE_USER_MESSAGE = 'messages/CREATE_USER_MESSAGE'
const loadAllMessages = (msgs) => ({
    type: GET_ALL_MESSAGES,
    msgs
})
const loadUserMessages = (msgs)=>({
    type: GET_USER_MESSAGES,
    msgs
})
const createUserMessage = (message)=>({
    type: CREATE_USER_MESSAGE,
    message
})
export const thunkAllMessages = (id) => async (dispatch) => {
    console.log("this is id", id)
    const response = await fetch(`/api/messages/${id}/messages`)
    if(response.ok){
        const data = await response.json()
        dispatch(loadAllMessages(data))
    }
}

export const thunkUserMessages = () => async(dispatch)=>{
    const response = await fetch(`/api/messages/user_messages/all`)
    console.log(response)
    if(response.ok){
        const data = await response.json()
        dispatch(loadUserMessages(data))
    }
}
export const thunkCreateUserMessage = (user) =>async (dispatch)=>{
    console.log('thsi is our user', user)
    const response = await fetch(`/api/messages/${user.id}/messages`, {
        method:"POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
    console.log('this is our response', response)
    if(response.ok){
        const data = await response.json()
        console.log(data)
        dispatch(createUserMessage(data))
    }
}

const initialState = { allMsg: {}, userMsgs:{}}
const messagesReducer=( state=initialState, action)=>{
    let newState;
    switch(action.type){
        case GET_ALL_MESSAGES:{
            newState = {}
            const allMsgs = action.msgs
            allMsgs.forEach(msg =>{
                newState[msg.id] = msg
            })
            return {allMsg: newState}
        }
        case GET_USER_MESSAGES:{
            newState={}
            const userMsgs = action.msgs
            userMsgs.forEach(msg=>{
                newState[msg.id]=msg
            })
            return {userMsgs:newState}
        }
        case CREATE_USER_MESSAGE:{
            newState={}
            const newMessage = action.message
            newState[newMessage.id] = newMessage
            return {
                ...state,
                userMsgs: {...state.userMsgs, ...newState}
            }
        }
        default: return state
    }
}
export default messagesReducer
