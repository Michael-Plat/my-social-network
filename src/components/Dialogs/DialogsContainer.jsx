import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { WithAuthRedirect } from '../../hoc/withAuthRedirect';
import { addMessageActionCreator, onMessageChangeActionCreator } from '../../redax/dialogsReducer';
import Dialogs from './Dialogs';
import s from './Dialogs.module.css';

/*const DialogsContainer = (props) => {
    
    let dialogsPage = props.store.getState().dialogsPage;
    
    let addMessage = () => {
        props.store.dispatch(addMessageActionCreator());
    }
    let onMessageChange = (text) => {
        props.store.dispatch(onMessageChangeActionCreator(text));
    }
    
    return <Dialogs onMessageChangeText={onMessageChange} addMessage={addMessage} dialogsPage={dialogsPage} />
}*/

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: () => {
            dispatch(addMessageActionCreator());
        },
        onMessageChange: (text) => {
            dispatch(onMessageChangeActionCreator(text));
        }
    }
}

export default compose (
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Dialogs);

