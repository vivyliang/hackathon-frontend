import { userConst } from '../constants/user-constants';

const initState = {};

export default(state = initState, action) => {
    switch (action.type) {
        case userConst.REGSITER_SUCCESS:
            return {
                ...state,
                user: {...action.userData.data},
            };
        case userConst.REGISTER_FAILTURE:
            return initState;
        default:
            return state;
    }
}