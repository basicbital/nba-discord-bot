
// data is array (for now)
// TODO: Investigate optimization in searching algorithm (Gabe: '.every' function)
getTeamId = function (data, firstName, lastName) {
    let returnValue = 0
    data.forEach(player => {
        if (player.firstName === firstName && player.lastName === lastName) {
            returnValue =  player.teamId
        }
    })
    return returnValue
}

/**
 * @param {Object[]} data JSON object of team games
 * @param {string[]} daysInWeek 7 sequential days always starting on Monday
 * @return {number} games played for given team in given week
 */
getGamesInWeek = function(data, daysInWeek) {
    let gamesPlayed = 0;
    data.forEach(game => {
        // logic to search all games
        let gameDate = game.startDateEastern
        if (gameDate >= daysInWeek[0] && gameDate <= daysInWeek[6]){
            gamesPlayed += 1;
        }
    })
    return gamesPlayed;
}

module.exports.getGamesInWeek = getGamesInWeek;
module.exports.getTeamId = getTeamId;
