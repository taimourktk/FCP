export const countGoals = function (summary, teamA, teamB) {

    let teamAGoals = 0,
        teamBGoals = 0;
    summary.forEach(entry => {
        if (entry.action === 'goal') {
            if (entry.team === teamA) {
                teamAGoals ++;
            }
            else if (entry.team === teamB) {
                teamBGoals ++;
            }
        }
    });

    return {
        teamAGoals,
        teamBGoals
    }

}

export const getLatestAction = function (summary) {
    return summary[summary.length - 1];
}