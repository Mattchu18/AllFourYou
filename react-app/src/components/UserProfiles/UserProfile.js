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
        {/* User component */}
        {users && Object.values(users).map(user=>{
            return (
                <Users key={user.id} user={user} />

            )
        })}
        </>
    )
}
export default UserProfile;
