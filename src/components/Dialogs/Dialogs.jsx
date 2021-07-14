import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';
import { reduxForm, Field } from 'redux-form';
import { Textarea } from '../common/FormsControls/FormControls';
import { maxLengthCreator, required } from '../../utils/validators/validators.js';

const Dialogs = (props) => {

    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);

    let messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id} />);
    
    let addNewMessage = (values) => {
        props.addMessage(values.newMessageBody);
    } 
    
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
            <div>
                <AddMessageFormRedux onSubmit={addNewMessage} />
            </div>
        </div>
    );
}

const maxLength50 = maxLengthCreator(50);

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit } >
            <div>
                <Field component={Textarea} name="newMessageBody" placeholder="Enter your message" 
                       validate={[required, maxLength50]} />
                {/* <textarea onChange={onMessageChange}  value={props.dialogsPage.newMessageText}></textarea> */}
            </div>
            <div>
                <button>Message</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm); 

export default Dialogs;