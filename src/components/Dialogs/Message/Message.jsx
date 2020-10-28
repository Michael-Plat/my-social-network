import React from 'react';
import s from './../Dialogs.module.css';

const Message = (props) => {

    let newMessageElement = React.createRef();
    let newMessage = () => {
        let text = newMessageElement.current.value;
        alert(text)
    }

    return (
        <div>
        <div className={s.message}>{props.message}</div>
            <textarea ref={ newMessageElement }></textarea>
            <button onClick= { newMessage }>New Message</button>
        </div>
    );
}

export default Message;