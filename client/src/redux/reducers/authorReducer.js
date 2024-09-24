import * as actionsTypes from '../actions/actionTypes';
import initalState from './initialState';

export default function authorReducer(state = initalState.authors, action) {
  switch (action.type) {
    case actionsTypes.LOAD_AUTHORS_SUCCESS:
      return action.authors;
    default:
      return state;
  }
}
