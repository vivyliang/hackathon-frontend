import { userConst } from '../constants/user-constants';
import { userService } from '../services/register-service';
import * as RootNavigation from '../routes/routes';

export const register = (userObj) => dispatch => {
    userService.register(userObj)
    .then((userData) => {
        if (!userData.error) {
            try {
                dispatch(registerSuccess(userData));
                RootNavigation.navigate('Character');
            } catch(err) { console.log(err); }
        } else {
            dispatch(registerFailure(userData.message));
        }
    })
    .catch((err) => {
        console.log(err);
        dispatch(registerFailure(err));
    });
    return { type: 'REGISTER' };
};

export const registerSuccess = (userData) => ({
    type: userConst.REGSITER_SUCCESS,
    userData
});

export const registerFailure = (err) => ({
    type: userConst.REGISTER_FAILURE,
    err
});