import React, { ComponentType } from 'react'
import { connect } from 'react-redux'
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redax/profileReducer'
import Profile from './Profile.jsx'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { AppStateType } from '../../redax/reduxStore'
import { ProfileType } from '../../types/types'

type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
  getUserProfile: (userId: number) => void
  getStatus: (userId: number) => void
  updateStatus: (status: string) => void
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => void

}

type PathParamsType = {
  userId: string
}

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>

class ProfileConteiner extends React.Component<PropsType>{
  reFreshProfile() {
    let userId: number | null = +this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        // todo: may be replace push with Redirect??? 
        this.props.history.push("/login")
      }
    }
    if (!userId) {
      console.error("ID should exists in URI params or in state ('authorizedUserId')")
    } else {
      this.props.getUserProfile(userId)
      this.props.getStatus(userId)
    }
  }

  componentDidMount() {

    this.reFreshProfile();
  }

  componentDidUpdate(prevProps: PropsType) {
    if (this.props.match.params.userId != prevProps.match.params.userId) {
      this.reFreshProfile();
    }
  }

  render() {
    return (
      <Profile {...this.props} profile={this.props.profile} status={this.props.status}
        updateStatus={this.props.updateStatus} isOwner={!this.props.match.params.userId}
        savePhoto={this.props.savePhoto} />
    );
  }
}
const mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
});

export default compose<ComponentType>(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
  withRouter)(ProfileConteiner);