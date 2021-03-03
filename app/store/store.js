import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import auth from '../reducers/auth-reducer';
import reg from '../reducers/register-reducer';

const reducers = combineReducers({
    auth,
    reg
});

const store = createStore(reducers, applyMiddleware(thunk));
export default store;