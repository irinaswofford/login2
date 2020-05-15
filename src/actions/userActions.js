import React from 'react';
import {
    SET_USERNAME,
    SET_PASSWORD,
    SET_LOGIN,
    SET_SHOW_ALERT,
    SET_USERS,
    LOGIN,
    LOGOUT
} from '../actions/action-types/user-actions';
import { OPEN_MODAL } from '../actions/action-types/modal-actionTypes.js';

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
export const setLogin = (isLoggedIn) => {

    const payloadAction = {
        type: SET_LOGIN,
        loggedIn: isLoggedIn
    }

    return payloadAction
}
export const setIsShowAlert = (isShowAlertWrongCredentials) => {

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


export const login = (loggedInUser) => {

    const payloadAction = {
        type: LOGIN,
        isLoggedIn: true,
        loggedInUser: loggedInUser
    }
    return payloadAction
}

export const logout = () => {

    const payloadAction = {
        type: LOGOUT,
        isLoggedIn: false,
        loggedInUser: null
    }

    return payloadAction
}

// onClick Login/Logout buttons
export const onClickLogin = (isLoggedIn, users, userInput_username, userInput_password, callback_redirect) => {

    // validation
    users = users || [];
    userInput_username = (userInput_username || "").trim();
    userInput_password = (userInput_password || "").trim();

    // init payload
    let payload = {
        type: "",
        loggedInUser: null,
        callback_redirect: callback_redirect || null
    };

    // check if already logged in
    if (isLoggedIn === true) {

        // log-out
        payload.type = LOGOUT;
        return payload;
    }

    // bools
    let isFoundCredentials = false;

    // work
    for (let i = 0; i < users.length; i++) {

        // un-pack
        let user = users[i] || {};
        let username_fromDatabase = (user["login"]["username"] || "").trim();
        let password_fromDatabase = (user["login"]["password"] || "").trim();

        // work- found username & password in database
        if (userInput_username === username_fromDatabase &&
            userInput_password === password_fromDatabase) {

            // login
            isFoundCredentials = true;
            payload.loggedInUser = user;
            payload.type = LOGIN;
            return payload;
        }
    }; // end for

    // user entered invalid credentials 
    if (!isFoundCredentials) {

        // show modal
        payload = {
            type: OPEN_MODAL,
            isOpenModal: true,
            header: <span style={{ color: "green" }}>Invalid Credentials</span>,
            body: <span>Please re-enter credentials</span>,
            buttonLeft: "",
            buttonRight: ""
        }

        return payload;
    }
}
