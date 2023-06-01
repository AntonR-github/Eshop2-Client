import { loginFailure, loginStart, loginSuccess } from './userRedux';
import { publicRequest } from '../constants/requestMethods';
import { logout } from './userRedux';

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post('/auth/login', user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
}

export const logoutUser = async (dispatch) => {
    dispatch(logout());
}

