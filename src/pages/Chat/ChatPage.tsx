import React, { FC, useEffect, useState } from "react"

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

const ChatPage: FC = () => {
    return <div>
        <Chat />
    </div>
}

const Chat: FC = () => {
    return <div>
        <Messages />
        <AddMessageForm />
    </div>
}

const Messages: FC = () => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        wsChannel.addEventListener('message', (e: MessageEvent) => {
            const newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        })
    }, [])

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

    const [message, setMessage] = useState(' ')

    const sendMessage = () => {
        if (!message) {
            return
        }
        wsChannel.send(message)
        setMessage('')
    }

    return <div>
        <div>
            <textarea onChange={(e) => setMessage((e.currentTarget.value))} value={message}></textarea>
        </div>
        <div>
            <button onClick={sendMessage} >Send</button>
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