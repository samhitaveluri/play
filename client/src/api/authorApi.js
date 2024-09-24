import { handleResponse, handleError } from './apiUtils';
const baseUrl = process.env.REACT_APP_API_URL + '/artist/';

export function getAuthors() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
