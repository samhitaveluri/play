import * as podcastApi from '../../api/podcastApi';
import * as actionTypes from '../actions/actionTypes';
import { apiCallError, beginApiCall } from '../actions/apiStatusActions';

function loadPodcastsSucess(podcasts) {
  return { type: actionTypes.LOAD_PODCASTS_SUCCESS, podcasts };
}

function updatePodcastSuccess(podcast) {
  return { type: actionTypes.UPDATE_PODCAST_SUCCESS, podcast: podcast };
}

function createPodcastSuccess(podcast) {
  return { type: actionTypes.CREATE_PODCAST_SUCCESS, podcast: podcast };
}

function deletePodcastAction(podcast) {
  return { type: actionTypes.DELETE_PODCAST, podcast: podcast };
}
export function loadPodcasts() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return podcastApi
      .getPodcasts()
      .then((podcasts) => {
        dispatch(loadPodcastsSucess(podcasts));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function savePodcast(newPodcast) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return podcastApi
      .savePodcast(newPodcast)
      .then((newPodcast) => {
        newPodcast.id
          ? dispatch(updatePodcastSuccess(newPodcast))
          : dispatch(createPodcastSuccess(newPodcast));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deletePodcast(podcast) {
  return function (dispatch) {
    dispatch(deletePodcastAction(podcast));
    return podcastApi.deletePodcast(podcast.id);
  };
}
