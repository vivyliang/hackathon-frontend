import axios from 'axios';
import qs from 'qs';
import * as RootNavigation from '../routes/routes';

export const userService = {
    register
};

function register(userObj) {
    console.log('hi2')
    return new Promise( (resolve, reject) => {
        axios.post("https://arcane-shore-64990.herokuapp.com/register", qs.stringify(userObj), { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
        .then( (user) => {
            console.log(user.data);
            resolve(user);
        })
        .catch( (err) => {
            console.log("err:",err)
            reject(err);
        })
        })
    
};