import {set, get} from './storage'
import user from './user'
import axios from 'axios' 
//export const api = "http://localhost:5001"
export const api = "https://obscure-ocean-64391.herokuapp.com/";
console.log("Api", api);
export default request = async (data) => {
    console.log("test line 1");


    try {
        let headers = {};
        let params = {};
        if (data.body && data.type !== 'GET')
            params.body = JSON.stringify(data.body);

        if (user.token)
            headers.Authorization = `Bearer ${user.token}`
            console.log("test line 2");

        let res = await fetch(api + data.route, {
           
            method: data.type,
            headers: {
                'Content-Type': 'application/json',
                ... headers,
            },
            ... params,
        });
        console.log("test line 3");

        return res.json();
    }
    catch (err) {
        console.log("test line 4");

        throw err;
    }

}