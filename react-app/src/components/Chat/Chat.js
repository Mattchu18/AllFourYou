import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { thunkAllMessages } from "../../store/messages";
import { thunkAllUsers } from '../../store/session';
import "./Chat.css"
let socket;

const Chat = () => {
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user)
    const allUsers = useSelector(state => state.session.allUsers)
    const { userMessageId } = useParams()
    const dispatch = useDispatch()

    const msgs = useSelector(state => state.messages.allMsg)
    const recipient = allUsers && Object.values(allUsers).find(user => user.id === parseInt(userMessageId))

    console.log("this is recipient=====>", Object.values(allUsers).find(user => user.id === parseInt(userMessageId)))
    // console.log("this is userMessageId", Number.isInteger(userMessageId))

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({
            scrollIntoViewOptions: { block: "nearest", inline: "end" },
            behavior: "smooth"
        })
    }

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        dispatch(thunkAllMessages(userMessageId))
        dispatch(thunkAllUsers())

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

        socket.emit("chat", { user_id: user.id, body: chatInput, user_message_id: userMessageId });

        dispatch(thunkAllMessages(userMessageId))
        setChatInput("")
    }

    useEffect(() => {
        dispatch(thunkAllMessages(userMessageId))

        scrollToBottom()
    }, [messages, scrollToBottom()])

    return (
        <div className="chat-center">
            <div className="chat-container">
                <div>
                    <h2>Your chat with {recipient?.first_name}</h2>
                </div>
                <div className="chats">
                    {msgs && Object.values(msgs).map((msg => {
                        return (
                            <div className="message">
                                {msg.userId === user.id ? <div className="mymessage" >{msg.userInfo.first_name}: <p className="my-chat-boxes">{msg.body}</p>
                                </div> : <div className="recipient">{msg.userInfo.first_name}: <p className="their-chat-boxes">{msg.body}</p>
                                </div>}
                            </div>
                        )
                    }))}
                    <div ref={messagesEndRef} />
                </div>
                {user && (

                    <form className="chat-box-form" onSubmit={sendChat}>
                        <div className="chat-box">
                            <textarea className="chat-box-textarea"
                                value={chatInput}
                                onChange={updateChatInput}
                                placeholder="Start your message. . . "
                            />
                            <button className="submit-chat-button" type="submit"><i class="fa-solid fa-paper-plane fa-lg"></i></button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
};


export default Chat;
