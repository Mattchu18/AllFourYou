import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { thunkAllUsers } from '../../store/session';
import { useEffect } from "react";

const UserProfile = ()=>{
// const allUsers = useSelector(state=> state)
const dispatch = useDispatch()
const {userId} = useParams()

useEffect(()=>{
    dispatch(thunkAllUsers())
}, [dispatch])
const user = useSelector(state=> state.session.user)
console.log("user in user component", user)

    return(
        <>
        User component
        {user.first_name}
        {user.last_name}
        </>
    )
}
export default UserProfile;
