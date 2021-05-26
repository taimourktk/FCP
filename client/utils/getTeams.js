import request from './request';
import {find} from 'lodash';
import user from './user';
let teams = [];

(async () => {
    let res = await request({ route: 'teams'});
    if (res.status === 'success') {
        teams = res.data;
    }
})();


export const getTeams = ({mine}) => {
    let teams__ =  mine ?
    teams.filter((team) => {
        return team.owner == user.id
    }) : teams;

    return teams__;
}

export const getTeamById = (id) => {
    let team = find(teams, {_id: id});
    return team;
}