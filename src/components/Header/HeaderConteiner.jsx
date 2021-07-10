import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { getAuthUserDate, logout } from '../../redax/authReducer.js';

class HeaderConteiner extends React.Component {
  componentDidMount() {
    this.props.getAuthUserDate();
  }
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

export default connect(mapStateToProps, { getAuthUserDate, logout })(HeaderConteiner);
