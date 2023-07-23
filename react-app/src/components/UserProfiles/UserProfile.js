import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { thunkAllUsers } from '../../store/session';
import { useEffect } from "react";
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { thunkAllMessages, thunkUserMessages } from '../../store/messages';
import Users from './Users';

const UserProfile = () => {
    const dispatch = useDispatch()
    const { userId } = useParams()


    useEffect(() => {
        dispatch(thunkAllUsers())
        dispatch(thunkUserMessages())
    }, [dispatch])
    const users = useSelector(state => state.session.allUsers)



    return (
        <div className='task-panda-community-center'>
            <div className="task-panda-p">
                <h2 className="task-panda-community">Task Panda Community!</h2>
                <p>Meet other TaskPanda users and Chat with them! <br/>Just click on <i className="far fa-comments fa-lg"></i> to connect with them!</p>

            {/* User component */}

            <div className="users-container">
                <h3 className="task-panda-top">Task Panda Users</h3>
                {users && Object.values(users).map(user => {
                    return (
                        <Users key={user.id} user={user} />

                    )
                })}
            </div>
            </div>

        </div>
    )
}
export default UserProfile;
