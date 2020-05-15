import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLogin, setUsers, login, logout, onClickLogin } from '../actions/userActions';
import { withRouter } from 'react-router-dom';
import { openModal, closeModal } from '../actions/modalActions';
import { LOGIN, LOGOUT } from '../actions/action-types/user-actions';
import { OPEN_MODAL } from '../actions/action-types/modal-actionTypes.js';

class TopBar extends Component {
  
  GetInitialsLoggedInUser(){
    let initialFirstName = (this.props.loggedInUser["name"]["first"] || "").charAt(0).toUpperCase();
    let initialLastName = (this.props.loggedInUser["name"]["last"] || "").charAt(0).toUpperCase();
    return `${initialFirstName}${initialLastName}` || "";
  }



  render() {
    return (
      <header className="header">
        <div style={styles.logo}>
          <Link to="/"><img alt={'logo'} style={{ maxHeight: 40, flex: 1 }} src="favicon-196x196.png" /></Link>
        </div>

        <div> {'Modus Create'}</div>

        <div style={{ float: 'left', color: 'white', flex: 1 }} />
        <div style={{ float: 'right', paddingRight: 20 }}>

          <div className="buttonLookalike"
            onClick={e => this.props.onClickLogin(this.props.isLoggedIn, this.props.users, this.props.username, this.props.password, (pageUrl) => { this.props.history.push(pageUrl) })}
            style={{ color: 'white' }}>
            {this.props.isLoggedIn ? `${this.GetInitialsLoggedInUser()} Logout` : "Login"}</div>

          <div style={{ backgroundColor: 'red' }} className="buttonLookalike"
            onClick={e => this.props.onClickLogin(this.props.isLoggedIn, this.props.users, this.props.username, this.props.password, (pageUrl) => { this.props.history.push(pageUrl) })}
          >
            {this.props.isLoggedIn ? "Logout" : "Signup"}</div>

        </div>
      </header >
    );
  }
}

const styles = {
  logo: {
    float: 'left',
    margin: 8
  }
};

const mapStateToProps = (state) => {
  return {
    username: state.userReducer.username,
    password: state.userReducer.password,
    isLoggedIn: state.userReducer.isLoggedIn,
    users: state.userReducer.users,
    loggedInUser: state.userReducer.loggedInUser
  };
}


const mapDispatchToProps = (dispatch) => {
  return {
    setLogin: (isLoggedIn) => {
      let payloadAction = setLogin(isLoggedIn);
      dispatch(payloadAction);
    },

    setIsShowAlert: (isShowAlertWrongCredentials) => {
      let payloadAction = setLogin(isShowAlertWrongCredentials);
      dispatch(payloadAction);
    },

    setUsers: (user) => {
      let payloadAction = setUsers(user);
      dispatch(payloadAction);
    },

    login: () => {
      let payloadAction = login();
      dispatch(payloadAction);
    },
    logout: () => {
      let payloadAction = logout();
      dispatch(payloadAction);
    },
    onClickLogin: (isLoggedIn, users, userInput_username, userInput_password, callback_redirect) => {
      let payloadAction = onClickLogin(isLoggedIn, users, userInput_username, userInput_password, callback_redirect);
      dispatch(payloadAction);

      // additional logic
      if (payloadAction.type === OPEN_MODAL) {
        dispatch({ type: LOGOUT });
      }
      else if (payloadAction.type === LOGIN) {
        if (typeof payloadAction.callback_redirect === "function") {
          payloadAction.callback_redirect("/userList");
        }
      }
      else if (payloadAction.type === LOGOUT) {
        if (typeof payloadAction.callback_redirect === "function") {
          payloadAction.callback_redirect("/home");
        }
      }
    },

    // modal controls
    openModal: (settings) => { dispatch(openModal(settings)) },
    closeModal: (callback) => { dispatch(closeModal(callback)) }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopBar))