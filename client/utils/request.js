import {set, get} from './storage'
import user from './user'

export const api = "https://safe-earth-03624.herokuapp.com/"

export default request = async (data) => {

  try {
        let headers = {};
        let params = {};
        if (data.body && data.type !== 'GET')
            params.body = JSON.stringify(data.body);

        if (user.token)
            headers.Authorization = `Bearer ${user.token}`

        let res = await fetch(api + data.route, {
            method: data.type,
            headers: {
                'Content-Type': 'application/json',
                ... headers,
            },
            ... params,
        });
        return res.json();
    }
    catch (err) {
        throw err;
    }

}