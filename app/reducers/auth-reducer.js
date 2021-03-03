import { userConst } from '../constants/user-constants';

const initState = {};

export default(state = initState, action) => {
    switch (action.type) {
        case userConst.LOGIN_SUCCESS:
            return {
                ...state,
                user: {...action.userData.data},
            };
        case userConst.ADD_GOAL:
            return {
                ...state,
                user: {...action.userData}
            }
        case userConst.LOGIN_FAILURE:
            return initState;
        case userConst.LOGOUT:
            return initState;
        default:
            return state;
    }
}