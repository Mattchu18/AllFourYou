import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { thunkAllMessages, thunkCreateUserMessage, thunkUserMessages } from "../../store/messages";
import "./Users.css"
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
            const userMsgs = await dispatch(thunkCreateUserMessage(user))
            // await dispatch(thunkUserMessages())
            console.log("thi sis user msgs========================", userMsgs)
            history.push(`/chat/${userMsgs.id}`)
        }
    }


    return (

        <div className="users-page">


        {user.id !== currUser.id ?
        <>
        <div className="user-to-chat">
            <div>
                 <div>
                   {user.first_name} {user.last_name}
            </div>
            <div className="description-box">
                Hi, my name is {user.first_name}. Chat with me here or connect with me by
                email: {user.email}
                 {/* I live in {user.city}. My username is {user.username} */}
            </div>
            </div>


 <i className='far fa-comments actual' onClick={ createUserMsgId }></i>
        </div>
        </>
        : <h3 className="task-panda-top">Task Panda Users</h3>}
     </div>

    )
}

export default Users
