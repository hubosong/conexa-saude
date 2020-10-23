export const ADD_USER = 'ADD_USER'
export const SHOW_PASS = 'SHOW_PASS'
export const ERR_MSG = 'ERR_MSG'
export const HIDDEN_COMM = 'HIDDEN_COMM'

export const addUser = (email: string, password: string) => {
    return { type: ADD_USER, email, password }
}
export const showPass = (show: boolean, hidden: boolean) => {
    return { type: SHOW_PASS, show, hidden }
}
export const errMsg = (errorMessage: string) => {
    return { type: ERR_MSG, errorMessage }
}
export const hiddenComm = (hiddenComments: boolean) => {
    return { type: HIDDEN_COMM, hiddenComments }
}