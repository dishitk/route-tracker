import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state,action) => {
    switch(action.type){
        case 'add_error':
            return {...state, errorMessage: action.payload}
        case 'signin':
            return { token: action.payload, errorMessage: '' }
        case 'clear_error_message':
            return {...state, errorMessage: ''}
        case 'signout':
            return {token: null, errorMessage: ''}
        default:
            return state;
    }
};

// const example = (a,b) => {
//     return a + b
// }

// const example = (a,b) => a+b
// Above commented example functions does the same task but written with different syntax

const tryLocalSignin = (dispatch) => {
    return async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            if (!token) {
                throw(err)
            }
            dispatch({type: 'signin', payload: token});
            navigate('TrackList');
        }
        catch (err) {
            navigate('loginFlow');
        }
        // const token = await AsyncStorage.getItem('token')
        // if (token) {
        //     dispatch({type: 'signin', payload: token});
        //     navigate('TrackList');
        // } else {
        //     navigate('loginFlow');
        // }
    }
}

const clearErrorMessage = (dispatch) => {
    return () => {
        dispatch({type: 'clear_error_message'});
    }
}
const signup = (dispatch) => {
    return async ({email,password}) => {
        try {
            const response = await trackerApi.post('/signup', {email,password});
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({type: 'signin', payload: response.data.token})
            navigate('TrackList');
        } catch (error) {
            console.log(error);
            dispatch({type: "add_error", payload: 'Something went wrong with signup'})
        }
    }
};

const signin = (dispatch) => {
    return async ({email,password}) => {
        try {
            const response = await trackerApi.post('/signin', {email,password});
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({type: 'signin', payload: response.data.token});
            navigate('TrackList');
        } catch (error) {
            console.log(error)
            dispatch({type: "add_error", payload: 'Something went wrong with signin'})
        }
    }
};

const signout = (dispatch) => {
    return async () => {
        await AsyncStorage.removeItem('token');
        dispatch({type: 'signout'});
        navigate('loginFlow');
    }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signup, signin, signout, clearErrorMessage, tryLocalSignin },
    { errorMessage: '', token: null}
)
