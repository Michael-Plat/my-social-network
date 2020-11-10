import React from 'react';
import { addMessageActionCreator, onMessageChangeActionCreator } from '../../redax/dialogsReducer';
import Dialogs from './Dialogs';
import s from './Dialogs.module.css';

const DialogsContainer = (props) => {
    
    let dialogsPage = props.store.getState().dialogsPage;
    
    let addMessage = () => {
        props.store.dispatch(addMessageActionCreator());
    }
    let onMessageChange = (text) => {
        props.store.dispatch(onMessageChangeActionCreator(text));
    }
    
    return <Dialogs onMessageChangeText={onMessageChange} addMessage={addMessage} dialogsPage={dialogsPage} />
}

export default DialogsContainer;