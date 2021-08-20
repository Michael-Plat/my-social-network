import React, { ComponentType } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { WithAuthRedirect } from '../../hoc/withAuthRedirect'
import { actions } from '../../redax/dialogsReducer'
import { AppStateType } from '../../redax/reduxStore'
import Dialogs from './Dialogs'

const mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps, { ...actions }),
    WithAuthRedirect
)(Dialogs);

