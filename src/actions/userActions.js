import {
    SET_USERNAME,
    SET_PASSWORD,
    SET_LOGIN,
    SET_SHOW_ALERT,
    SET_USERS
} from '../actions/action-types/user-actions';

export const setUserName = (username) => {

    const payloadAction = {
        type: SET_USERNAME,
        username: username || ''
    }

    return payloadAction
}

export const setPassword = (password) => {

    const payloadAction = {
        type: SET_PASSWORD,
        password: password || ''
    }

    return payloadAction
}
export const setLogin = (isLoggedIn ) => {

    const payloadAction = {
        type: SET_LOGIN,
        loggedIn: isLoggedIn 
    }

    return payloadAction
}
export const setIsShowAlert = (isShowAlertWrongCredentials ) => {

    const payloadAction = {
        type: SET_SHOW_ALERT,
        isShowAlertWrongCredentials: isShowAlertWrongCredentials 
    }

    return payloadAction
}

export const setUsers = (users) => {

    const payloadAction = {
        type: SET_USERS,
        users: users || []
    }

    return payloadAction
}