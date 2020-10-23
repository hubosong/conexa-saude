import { ADD_USER, SHOW_PASS, ERR_MSG, HIDDEN_COMM } from './Actions'

const initialState = {
    email: 'hu@bo.song',
    password: '112233',
    show: true,
    hidden: false,
    errorMessage: '',
    hiddenComments: false,
}

export const mainReducer = (state = initialState, action: any) => {
    switch (action.type) {
        
        case ADD_USER:
            return { ...state, email: action.email, password: action.password }
        case SHOW_PASS:
            return { ...state, show: action.show, hidden: action.hidden }
        case ERR_MSG:
            return { ...state, errorMessage: action.errorMessage }            
        case HIDDEN_COMM:
            return { ...state, hiddenComments: action.hiddenComments }

        default:
            return state
    }
}
