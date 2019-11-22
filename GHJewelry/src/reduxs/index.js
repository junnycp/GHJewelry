import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {combineReducers} from "redux";
import LoginReducer from '../views/Login/reducers';

const rootReducer = combineReducers({
  LoginReducer
});

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
