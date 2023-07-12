import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { thunkAllUsers } from '../../store/session';
import { useEffect } from "react";
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { thunkAllMessages } from '../../store/messages';

const UserProfile = ()=>{
// const allUsers = useSelector(state=> state)
const dispatch = useDispatch()
const {userId} = useParams()

const msgs = useSelector(state=> state)
console.log("user in msgs component", msgs)



useEffect(()=>{
    dispatch(thunkAllUsers())
}, [dispatch])
const users = useSelector(state=> state.session.allUsers)

    return(
        <>
        User component
        {users &&  Object.values(users).map(user=>{
           return(
           <>
           <div>{user.first_name}</div>
           <NavLink to="">
           <i className="fas fa-envelope"></i>
           </NavLink>
           </>
           )
        })}
        </>
    )
}
export default UserProfile;
