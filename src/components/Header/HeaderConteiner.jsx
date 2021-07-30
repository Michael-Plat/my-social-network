import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { logout } from '../../redax/authReducer';

class HeaderConteiner extends Component {
  render() {
    return (
      <Header {...this.props} />
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login
});

export default connect(mapStateToProps, { logout })(HeaderConteiner);
