import React, { Component } from 'react';
import { setPassword, setUserName, setLogin, setUsers } from '../actions/userActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ModalUi from './Modal';
import { openModal, closeModal } from '../actions/modalActions';
class HomeContent extends Component {
  constructor(props) {
    super(props);
    this.loggedIn = this.loggedIn.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
  };

  componentDidMount() {
    this.props.setLogin(false);
    this.fetchUsers()
  }

  async fetchUsers() {
    try {
      const response = await fetch('db.json');
      const json = await response.json();
      let users = json["users"];
      this.props.setUsers({ data: users })
      if (!response.ok) {
        throw Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  }

  loggedIn() {

    // check if already logged in
    if (this.props.isLoggedIn === true) {
      // log-out
      this.props.setLogin(false);
      return;
    }

    // bools
    let weFoundIt = false;

    this.props.users.data.forEach((user, index) => {
      // un-pack
      let username = (user["login"]["username"] || "").trim();
      let password = (user["login"]["password"] || "").trim();

      // work
      if (this.props.username === username && this.props.password === password) {
        weFoundIt = true;
        this.props.setLogin(true);
        this.props.history.push('/userList');
        return false;
      }
      else if (this.props.username === username && !this.props.password === password) {
        this.props.openModal({
          header: <span style={{ color: "green" }}>Password is invalid</span>,
          body: <span>Please re-enter credentials</span>,
          buttonLeft: <button onClick={e => this.props.closeModal(e)}>Dismiss</button>
        });
      }
      else if (!this.props.username === username && this.props.password === password) {
        this.props.openModal({
          header: <span style={{ color: "green" }}>Username is invalid</span>,
          body: <span>Please re-enter credentials</span>,
          buttonLeft: <button onClick={e => this.props.closeModal(e)}>Dismiss</button>
        });
      }

    }); // end foreach

    if (!weFoundIt) {
      /// show alert
      this.props.setLogin(false);
      this.props.setIsShowAlert(true);
      this.props.openModal({
        header: <span style={{ color: "green" }}>Invalid Credentials</span>,
        body: <span>Please re-enter credentials</span>,
        buttonLeft: <button onClick={e => this.props.closeModal(e)}>Dismiss</button>
      });

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
          <div className="buttonLookalike" onClick={e => this.loggedIn(e)} style={{ color: 'white' }}>
            {this.props.setLogin ? "Login" : "Logout"}</div>
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
    // modal controls
    openModal: (settings) => { dispatch(openModal(settings)) },
    closeModal: (callback) => { dispatch(closeModal(callback)) }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeContent))
