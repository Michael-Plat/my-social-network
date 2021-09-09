import React, { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { sendMessage, startMessagesListening, stopMessagesListening } from "../../redax/ChatReducer"
import { AppStateType } from "../../redax/reduxStore"

const ChatPage: FC = () => {
    return <div>
        <Chat />
    </div>
}

const Chat: FC = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return <div>
        <Messages />
        <AddMessageForm />
    </div>
}

const Messages: FC = () => {

    const messages = useSelector((state: AppStateType) => state.chat.messages)

    return <div style={{ height: '500px', overflowY: 'auto' }}>
        {messages.map((m, index) => <Message key={index} message={m} />)}
    </div>
}

const Message: FC<{ message: ChatMessageType }> = ({ message }) => {

    return <div>
        <img src={message.photo} style={{ width: '70px', height: '70px' }} alt={'user'} /> <b>{message.userName}</b>
        <br />
        {message.message}
        <hr />
    </div>
}

const AddMessageForm: FC = () => {

    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    const dispatch = useDispatch()

    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    return <div>
        <div>
            <textarea onChange={(e) => setMessage((e.currentTarget.value))} value={message}></textarea>
        </div>
        <div>
            <button disabled={false } onClick={sendMessageHandler} >Send</button>
        </div>
    </div>
}

export default ChatPage

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}