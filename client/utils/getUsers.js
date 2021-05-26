import request from './request';
import {find} from 'lodash'
let users = [];

(async () => {
    let res = await request({ route: 'users'});
    if (res.status === 'success') {
        users = res.data;
    }
})();

export const getUserById = (id) => {
    let user = find(users, {_id: id});
    return user;
}