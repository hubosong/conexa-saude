import { createStore } from 'redux'
import { mainReducer } from './Reducers'

export const Store = createStore(mainReducer)