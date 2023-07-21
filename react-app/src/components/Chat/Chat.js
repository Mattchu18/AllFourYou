import React, { useState, useEffect, useRef } from "react";
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

    const msgs = useSelector(state => state.messages.allMsg)

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
        socket = io("https://taskpanda-6a6ccf8b8f46.herokuapp.com");

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
                <div className="chats">
                    {msgs && Object.values(msgs).map((msg => {
                        return (
                            <div>
                                {msg.userId === user.id ? <div className="mymessage" >{msg.userInfo.first_name}: <p className="my-chat-boxes">{msg.body}</p>
                                </div> : <div>{msg.userInfo.first_name}: <p className="their-chat-boxes">{msg.body}</p>
                                </div>}
                            </div>
                        )
                    }))}
                    <div ref={messagesEndRef} />
                </div>
                {user && (
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
        </div>
    )
};


export default Chat;
