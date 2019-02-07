
// data is array (for now)
// TODO: Investigate optimization in searching algorithm (Gabe: '.every' function)
module.exports.getTeamId = function (data, firstName, lastName) {
    let returnValue = 0
    data.forEach(player => {
        if (player.firstName === firstName && player.lastName === lastName) {
            returnValue =  player.teamId
        }
    })
    return returnValue
}
