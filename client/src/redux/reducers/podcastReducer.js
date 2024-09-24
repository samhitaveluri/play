import * as actionsTypes from '../actions/actionTypes';
import initalState from './initialState';

export default function podcastReducer(state = initalState.podcasts, action) {
  switch (action.type) {
    case actionsTypes.CREATE_PODCAST_SUCCESS:
      return [...state, { ...action.podcast }];
    case actionsTypes.LOAD_PODCASTS_SUCCESS:
      return action.podcasts;
    case actionsTypes.UPDATE_PODCAST_SUCCESS:
      return state.map((podcast) =>
        podcast.id === action.podcast.id ? action.podcast : podcast
      );
    case actionsTypes.DELETE_PODCAST:
      return state.filter((podcast) => {
        return podcast.id !== action.podcast.id;
      });
    default:
      return state;
  }
}
