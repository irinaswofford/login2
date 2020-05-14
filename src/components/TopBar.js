import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLogin,  setUsers } from '../actions/userActions';
import { withRouter } from 'react-router-dom';
class TopBar extends Component {
  constructor(props) {

    super(props);
    this.state = {
      loggedIn: false
    };

    this.loggedIn = this.loggedIn.bind(this);
  }

  loggedIn(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();


    if (this.props.isLoggedIn === true) {
      // log-out
      this.props.setLogin(false);
      alert(this.props.isLoggedIn);
      this.props.history.push('/home');
   
    }
    else {
      // login
      this.props.setLogin(true);
      alert(this.props.isLoggedIn);
       
    
    }
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

          <div className="buttonLookalike" onClick={e => this.loggedIn(e)} style={{ color: 'white' }}>
            {this.props.isLoggedIn ? "IS Logout" : "Login"}</div>

          <div style={{ backgroundColor: 'red' }} className="buttonLookalike" onClick={e => this.loggedIn(e)}>
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
    isLoggedIn: state.userReducer.isLoggedIn
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
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopBar))