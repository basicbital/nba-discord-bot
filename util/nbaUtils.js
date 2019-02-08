
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

module.exports.getCurrentMonday = function() {
    const DAY_IN_MILLISEC = 86400000;
    const today = new Date();
    const dayOfWeek = today.getDay();
    const date = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

}