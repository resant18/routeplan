import * as UserAPIUtil from '../util/user_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';

const receiveUser = user => ({
    type: RECEIVE_USER,
    user
});

const receiveUserErrors = errors => ({
    type: RECEIVE_USER_ERRORS,
    errors
});

export const requireUser = userId => dispatch => {
    return UserAPIUtil.fetchUser(userId)
        .then(res => dispatch(receiveUser(res.data)))
        .catch(err => dispatch(receiveUserErrors(err.response.data)));
};