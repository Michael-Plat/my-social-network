import React from 'react';
import { Redirect } from 'react-router';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';

const Dialogs = (props) => {

    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);

    let messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id} />);
    
    let addMessage = () => {
        props.addMessage();
    }
    let onMessageChange = (e) => {
        let text = e.target.value;
        props.onMessageChange(text)
    }
    
    if (!props.isAuth) return <Redirect to='/Login' />;

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