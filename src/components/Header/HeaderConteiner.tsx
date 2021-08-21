import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header, { PropsType } from './Header';
import { logout } from '../../redax/authReducer';
import { AppStateType } from '../../redax/reduxStore';

class HeaderConteiner extends Component<PropsType > {
  render() {
    return (
      <Header {...this.props} />
    );
  }
}

const mapStateToProps = (state: AppStateType ) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login
});

export default connect(mapStateToProps, { logout })(HeaderConteiner);
