import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const trackReducer = (state, action) => {
    switch(action.type) {
        case 'fetch_tracks':
            return action.payload;
        default:
            return state;
    }
};

const fetchTracks = (dispatch) => {
    return async () => {
        const response = await trackerApi.get('/tracks');
        dispatch({type: 'fetch_tracks', payload: response.data})
    }
}

const createTrack = (dispatch) => {
    return async (trackName, locations) => {
        await trackerApi.post('/tracks', {trackName, locations});
        // console.log(trackName, locations.length)
    }
}

export const { Provider, Context } = createDataContext(
    trackReducer,
    { fetchTracks, createTrack },
    []
);

