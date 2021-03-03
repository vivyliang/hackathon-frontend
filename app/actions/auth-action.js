import { userConst } from '../constants/user-constants';
import { userService } from '../services/auth-service';
import * as RootNavigation from '../routes/routes';

export const login = (userObj) => dispatch => {
    userService.login(userObj)
    .then((userData) => {
        if (!userData.error) {
            try {
                dispatch(loginSuccess(userData));
                RootNavigation.navigate('Home');
            } catch(err) { console.log(err); }
        } else {
            dispatch(loginFailure(userData.message));
        }
    })
    .catch((err) => {
        console.log(err);
        dispatch(loginFailure(err));
    });
    return { type: 'LOGIN' };
};

export const addGoal = (userData) => {
    RootNavigation.navigate("Goals");
    return (
        {
            type: userConst.ADD_GOAL,
            userData
        }
    )
}


export const loginSuccess = (userData) => ({
    type: userConst.LOGIN_SUCCESS,
    userData
});

export const loginFailure = (err) => ({
    type: userConst.LOGIN_FAILURE,
    err
});