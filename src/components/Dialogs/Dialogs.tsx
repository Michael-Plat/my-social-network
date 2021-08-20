import React, { FC } from 'react'
import DialogItem from './DialogItem/DialogItem'
import s from './Dialogs.module.css'
import Message from './Message/Message'
import { InitialStateType } from '../../redax/dialogsReducer'
import AddMessageForm from './AddMessageForm/AddMessageForm'

const Dialogs: FC<PropsType> = (props) => {

    const dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);

    const messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id} />);

    const addNewMessage = (values: NewMessageFormValuesType) => {
        props.sendMessage(values.newMessageBody);
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
                <AddMessageForm onSubmit={addNewMessage} />
            </div>
        </div>
    );
}

export default Dialogs;

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}

export type NewMessageFormValuesType = {
    newMessageBody: string
}