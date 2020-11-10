import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';

const Dialogs = (props) => {

    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id} />);

    let messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message} />);
    
    let addMessage = () => {
        props.addMessage();
    }
    let onMessageChange = (e) => {
        let text = e.target.value;
        props.onMessageChangeText(text)
    }
    
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <textarea onChange={onMessageChange}  value={props.dialogsPage.newMessageText}></textarea>
                <button onClick={addMessage}>New Message</button>
            </div>
        </div>
    );
}

export default Dialogs;