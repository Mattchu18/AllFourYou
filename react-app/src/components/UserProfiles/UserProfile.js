import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { thunkAllUsers } from '../../store/session';
import { useEffect } from "react";
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { thunkAllMessages, thunkUserMessages } from '../../store/messages';
import Users from './Users';

const UserProfile = () => {
// const allUsers = useSelector(state=> state)
const dispatch = useDispatch()
const {userId} = useParams()



useEffect(()=>{
    dispatch(thunkAllUsers())
    dispatch(thunkUserMessages())
}, [dispatch])
const users = useSelector(state=> state.session.allUsers)

// const createUserMsg = (user) => {

// }

    return(
        <>
        <h2 className="task-panda-community">Task Panda Community!</h2>
        <div className="task-panda-p">
                    <p>Meet other TaskPanda users and Chat with them! Just click on the Chat Icon</p><i className="far fa-comments"></i><p>to connect with them!</p>

        </div>
        {/* User component */}

        <div className="users-container">
        <h3 className="task-panda-top">Task Panda Users</h3>
                    {users && Object.values(users).map(user=>{
            return (
                <Users key={user.id} user={user} />

            )
        })}
        </div>

        </>
    )
}
export default UserProfile;
