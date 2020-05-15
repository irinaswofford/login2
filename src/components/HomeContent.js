import React, { Component } from 'react';
import { setPassword, setUserName, setLogin, setUsers, login, logout, onClickLogin } from '../actions/userActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ModalUi from './Modal';
import { openModal, closeModal } from '../actions/modalActions';
import { LOGIN, LOGOUT } from '../actions/action-types/user-actions';
import { OPEN_MODAL } from '../actions/action-types/modal-actionTypes.js';

class HomeContent extends Component {

  constructor(props) {
    super(props);

    // bind
    this.fetchUsers = this.fetchUsers.bind(this);
  };


  async componentDidMount() {

    // start clean- logout
    this.props.logout();
    this.props.setUserName("");
    this.props.setPassword("");

    // fetch Users
    let users = await this.fetchUsers();

    // set users redux
    this.props.setUsers(users);
  }

  // fetch Users
  async fetchUsers() {

    try {
      // fetch
      const response = await fetch('db.json');

      // validation
      if (!response.ok) {
        console.log("unexpected problem with api call fetchUsers");
        throw Error(response.statusText);
      }

      // un-pack
      const json = await response.json();
      let users = json["users"] || [];

      return users;
    }
    catch (error) {
      console.log(error);
    }
  }





  render() {

    return (


      <div>


        <div className="container">
          <div style={{ marginBottom: 20, marginTop: 40 }}>
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" name="username"
              onInput={event => this.props.setUserName(event.target.value)}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password"
              onInput={event => this.props.setPassword(event.target.value)}
            />
          </div>

          <div className="buttonLookalike"
            onClick={e => this.props.onClickLogin(this.props.isLoggedIn, this.props.users, this.props.username, this.props.password, (pageUrl) => { this.props.history.push(pageUrl) })}
            style={{ color: 'white' }}>
            {this.props.isLoggedIn ? "Logout" : "Login"}</div>
          <ModalUi />
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {

  return {
    username: state.userReducer.username,
    password: state.userReducer.password,
    isLoggedIn: state.userReducer.isLoggedIn,
    users: state.userReducer.users
  };
}

const mapDispatchToProps = (dispatch) => {

  return {

    setPassword: (password) => {
      let payloadAction = setPassword(password);
      dispatch(payloadAction);
    },
    setUserName: (user) => {
      let payloadAction = setUserName(user);
      dispatch(payloadAction);
    },
    setLogin: (isLoggedIn) => {
      let payloadAction = setLogin(isLoggedIn);
      dispatch(payloadAction);
    },
    setUsers: (users) => {
      let payloadAction = setUsers(users);
      dispatch(payloadAction);
    },
    setIsShowAlert: (isShowAlertWrongCredentials) => {
      let payloadAction = setLogin(isShowAlertWrongCredentials);
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeContent))
