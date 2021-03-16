import moment from 'moment';

class User {
    
    constructor(data={}) {
        this._id = data._id;
        this._name = data.firstName + ' ' +data.lastName;
        this._email = data.email;
        this._token = data.token;
        this._joinDate = data.createdAt;
    }

    setData (data) {
        this._id = data._id;
        this._name = data.firstName + ' ' +data.lastName;
        this._email = data.email;
        this._token = data.token;
        this._joinDate = data.createdAt;
    }

    // getter and setter for class properties

    get name () {
        return this._name;
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

    set email (_email) {
        this._email = _email;
    }

    get joinDate () {
        return moment (new Date(this._joinDate)).format('MMM DD, YY');;
    }


};

let user = new User();

export default user;