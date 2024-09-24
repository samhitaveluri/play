import * as actionTypes from '../actions/actionTypes';
import * as authorApi from '../../api/authorApi';
import { beginApiCall } from './apiStatusActions';

export function loadAuthorsSuccess(authors) {
  return { type: actionTypes.LOAD_AUTHORS_SUCCESS, authors: authors };
}

export function loadAuthors() {
  return function (disptach) {
    disptach(beginApiCall());
    return authorApi
      .getAuthors()
      .then((authors) => {
        disptach(loadAuthorsSuccess(authors));
      })
      .catch((error) => {
        throw error;
      });
  };
}
