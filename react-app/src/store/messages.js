const GET_ALL_MESSAGES = 'messages/GET_ALL_MESSAGES'

const loadAllMessages = (messages) => ({
    type: GET_ALL_MESSAGES,
    messages
})

// export const thunkAllMessages = () => async (dispatch) => {
//     const response = await fetch('')
// }