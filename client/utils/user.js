import moment from 'moment';
import { api } from './request'

class User {
    
    constructor(data={}) {
        this._id = data._id;
        this._name = data.firstName + ' ' +data.lastName;
        this._email = data.email;
        this._token = data.token;
        this._joinDate = data.createdAt;
        this._phone = data.phone;
        this._city = data.city;
        this._role = data.role;
        this._photo = data.photo;
        this.onUpdateList = [];
    }

    setData (data) {
        console.log("Data", data)
        this._id = data._id;
        this._name = data.firstName + ' ' +data.lastName;
        this._firstName = data.firstName;
        this._lastName = data.lastName;
        this._email = data.email;
        this._token = data.token;
        this._joinDate = data.createdAt;
        this._phone = data.phone;
        this._city = data.city;
        this._role = data.role;
        this._photo = data.photo;
    }

    // getter and setter for class properties

    get id () {
        return this._id;
    }

    get name () {
        return this._name;
    }

    get firstName () {
        return this._firstName;
    }

    get lastName () {
        return this._lastName;
    }

    set name (_name) {
        this._name = _name;
    }

    get token () {
        return this._token;
    }

    set token (_token) {
        this._token = token;
    }

    get email () {
        return this._email;
    }

    get phone () {
        return this._phone;
    }

    get city () {
        return this._city;
    }

    get role () {
        return this._role;
    }

    set email (_email) {
        this._email = _email;
        this.runListeners();
    }

    get joinDate () {
        return moment (new Date(this._joinDate)).format('MMM DD, YY');;
    }

    get photo () {
        return this._photo ? api + "images/" +this._photo: '';
    }

    set photo (name) {
        this._photo = name;
        this.runListeners();
    }

    listenChange (func) {
        this.onUpdateList.push(func)
    }

    runListeners = () => {
        this.onUpdateList.forEach(func => func());
    }


};

let user = new User();

export default user;