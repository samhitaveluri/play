import { handleResponse, handleError } from './apiUtils';
const baseUrl = process.env.REACT_APP_API_URL + '/podcasts/';

export function getPodcasts() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function savePodcast(podcast) {
  console.log(podcast);
  return fetch(baseUrl + (podcast.id || ''), {
    method: podcast.id ? 'PUT' : 'POST', // POST for create, PUT to update when id already exists.
    body: podcast,
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deletePodcast(postCastId) {
  return fetch(baseUrl + postCastId, { method: 'DELETE' })
    .then(handleResponse)
    .catch(handleError);
}
