import {
    SET_USERNAME,
    SET_PASSWORD,
    SET_LOGIN,
    SET_SHOW_ALERT,
    SET_USERS,
    LOGIN,
    LOGOUT
} from '../actions/action-types/user-actions';

// initialState
const initState = {
    username: '',
    password: '',
    isLoggedIn: false,
    isShowAlertWrongCredentials: false,
    users: [],
    loggedInUser: null
}

const userReducer = (state = initState, action) => {


    if (action.type === SET_USERNAME) {
        return {
            ...state,
            username: action.username
        }
    }
    else if (action.type === SET_PASSWORD) {
        return {
            ...state,
            password: action.password
        }
    }
    else if (action.type === SET_LOGIN) {
        return {
            ...state,
            isLoggedIn: action.isLoggedIn
        }
    }

    else if (action.type === SET_SHOW_ALERT) {
        return {
            ...state,
            isShowAlertWrongCredentials: action.isShowAlertWrongCredentials
        } 
    }
    else if (action.type === SET_USERS) {
        return {
            ...state,
            users: action.users
        }
    }
    else if (action.type === LOGIN) {
        return {
            ...state,
            isLoggedIn: true,
            loggedInUser: action.loggedInUser
        }
    }
    else if (action.type === LOGOUT) {
        return {
            ...state,
            isLoggedIn: false,
            loggedInUser: null
        }
    }
    else {
        return state;
    }

}

export default userReducer;