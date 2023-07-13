import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { thunkAllMessages } from "../../store/messages";
import "./Chat.css"
let socket;

const Chat = () => {
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user)
    const { userMessageId } = useParams()
    const dispatch = useDispatch()

    const msgs = useSelector(state=> state.messages.allMsg)
    // console.log("..............messages", messages)
    // const msgsArr = Object.values(msgs)


    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        dispatch(thunkAllMessages(userMessageId))


        socket.on("chat", (chat) => {
            setMessages(messages => [...messages, chat])
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])



    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()
        console.log("thisi s user===>", user)

        socket.emit("chat", { user_id: user.id, body: chatInput, user_message_id: userMessageId });

 dispatch(thunkAllMessages(userMessageId))
        setChatInput("")
    }
    useEffect(()=>{
        dispatch(thunkAllMessages(userMessageId))

    }, [messages])
    return (
        <>
        {/* Hlelo */}
        <div className="chat-container">
            <div className="chats">
                    {/* {console.log("this is msgs,,,", Object.values(msgs))} */}
                {msgs && Object.values(msgs).map((msg=>{
                    {console.log(".....", msg)}
                   return(
                       <>

         {msg.userId === user.id ? <div className="mymessage">{msg.userInfo.first_name}: <p className="chat-boxes">{msg.body}</p>
                        </div>:  <div>{msg.userInfo.first_name}: <p className="chat-boxes">{msg.body}</p>
                        </div>}


                   </>)
                }))}
            </div>
{        user && (
        <div>

            <form onSubmit={sendChat}>
                <div className="chat-box">
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button type="submit">Send</button>
                </div>
            </form>
        </div>
    )}
    </div>
        </>
    )
};


export default Chat;
