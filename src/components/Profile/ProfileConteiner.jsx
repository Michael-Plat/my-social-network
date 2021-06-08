import React from 'react';
import { connect } from 'react-redux';
import { getUserProfile } from '../../redax/profileReducer.js';
import Profile from './Profile.jsx';
import s from './Profile.module.css';
import { withRouter } from 'react-router-dom';
import { WithAuthRedirect } from '../../hoc/withAuthRedirect.js';

class ProfileConteiner extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 15;
    }
    this.props.getUserProfile(userId);
  }
  render() {
    return (
      <Profile {...this.props} profile={this.props.profile} />
    );
  }
}

let AuthRedirectComponent = WithAuthRedirect(ProfileConteiner);

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile 
});

let WithUrlDataConteinerComponent = withRouter(AuthRedirectComponent);

export default connect(mapStateToProps, { getUserProfile })(WithUrlDataConteinerComponent);