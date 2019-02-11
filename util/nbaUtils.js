const moment = require('moment');
const moment_timezone = require('moment-timezone');

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

getCurrentMonday = function() {
    const easternTime = moment_timezone().tz('America/New_York');
    const monDate = (moment(easternTime).day("Monday"));
  
    return monDate;
  }
  
getDaysOfWeek = function(monDate) {
    let daysOfWeek = [];

    for(let i = 0; i < 7; ++i) {
        let addDate = monDate;
        daysOfWeek.push(addDate.format("YYYYMMDD"));
        addDate = monDate.add(1, "days");
    }

    return daysOfWeek;
}

module.exports.getTeamId = getTeamId;
module.exports.getCurrentMonday = getCurrentMonday;
module.exports.getDaysOfWeek = getDaysOfWeek;
