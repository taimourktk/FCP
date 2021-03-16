import request from './request';
import {find} from 'lodash'
let teams = [];

(async () => {
    let res = await request({ route: 'teams'});
    if (res.status === 'success') {
        teams = res.data;
    }
})();

export default getTeams = (query) => {

}

export const getTeamById = (id) => {
    let team = find(teams, {_id: id});
    return team;
}