import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { thunkCreateUserMessage } from "../../store/messages";

const Users = ({user}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const msgs = useSelector(state=> state.messages.userMsgs)
    const currUser = useSelector(state => state.session.user)
    let check;
    if (msgs) check = Object.values(msgs)
    console.log(check)
    let userMsgId;
    const checkUserMsg = () => {
        for (let i = 0; i < check?.length; i++) {
            console.log(check[i].user1_id, currUser.id, check[i].user2_id, user.id)
        if ((check[i].user1_id === currUser.id && check[i].user2_id === user.id) ||  (check [i].user1_id === user.id && check[i].user2_id === currUser.id)) {
            userMsgId = check[i].id
            return true
            } 
        }
        return false
    }

    const checks = checkUserMsg()
    console.log(checks)
    const createUserMsgId = async (e) => {

        if (checks) {
            history.push(`/chat/${userMsgId}`)
        } else {
            console.log(user)
            await dispatch(thunkCreateUserMessage(user))
            // history.push(`/chat/${userMsg.id}`)
        }
    }


    return (
        <>
        {user.id !== currUser.id ? 
        <>
        {user.first_name}
        <i className='fas fa-envelope' onClick={ createUserMsgId }></i>
        </>
        : null}

        </>
    )
}

export default Users