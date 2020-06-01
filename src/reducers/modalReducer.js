
import { OPEN_MODAL, CLOSE_MODAL, REMOVE_ONCLOSEMODAL }
 from '../actions/action-types/modal-actionTypes.js';


const initState = {
    modal: {
        isOpenModal: false,
        modalId: "modal1",
        header: "",
        body: "",
        footer: "",
        // modal events
        onOpenModal: null,
        onCloseModal: null,
        // buttons
        buttonLeft: null,
        buttonRight: null,
    }
}


const modalReducer = (state = initState, action) => {

    //INSIDE HOME COMPONENT
    if (action.type === OPEN_MODAL) {

        debugger
        return {
            ...state,
            modal: {
                ...state.modal,
                isOpenModal: action.isOpenModal,
                modalId: action.modalId,
                header: action.header,
                body: action.body,
                buttonLeft: action.buttonLeft,
                buttonRight: action.buttonRight
            }
        }
    }
    else if (action.type === CLOSE_MODAL) {
        return {
            ...state,
            modal: {
                ...state.modal,
                isOpenModal: action.isOpenModal,
                onCloseModal: action.onCloseModal
            }
        }
    } 
    else if (action.type === REMOVE_ONCLOSEMODAL) {
        return {
            ...state,
            modal: {
                ...state.modal,
                onCloseModal: null
            }
        }
    }

    else {
        return state;
    }
 

}

export default modalReducer