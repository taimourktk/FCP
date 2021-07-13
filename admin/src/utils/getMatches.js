import { request } from './request';
let matches = [];

(async () => {
    let res = await request({ route: 'matches'});
    if (res.status === 'success') {
        matches = res.data;
    }
})();

export const getMatches = (query) => {
    return matches;
}