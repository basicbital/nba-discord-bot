const players = [{
  'firstName': 'Jaylen',
  'lastName': 'Adams',
  'personId': '1629121',
  'teamId': '1610612737',
  'jersey': '10',
  'isActive': true,
  'pos': 'G',
  'heightFeet': '6',
  'heightInches': '2',
  'heightMeters': '1.88',
  'weightPounds': '190',
  'weightKilograms': '86.2',
  'dateOfBirthUTC': '1996-05-04',
  'teams':
  [{ 'teamId': '1610612737',
    'seasonStart': '2018',
    'seasonEnd': '2018'
  }],
  'draft': {
    'teamId': '',
    'pickNum': '',
    'roundNum': '',
    'seasonYear': ''
  },
  'nbaDebutYear': '2018',
  'yearsPro': '0',
  'collegeName': 'St. Bonaventure',
  'lastAffiliation': 'St. Bonaventure/USA',
  'country': 'USA'
}]

const teamSchedule = [
  { 'startDateEastern': '20181001' },
  { 'startDateEastern': '20181003' },
  { 'startDateEastern': '20181004' }
]

const getPlayers = function () {
  return new Promise((resolve, reject) => {
    process.nextTick(() => resolve(players))
  })
}

const getTeamSchedule = function (teamId) {
  return new Promise((resolve, reject) => {
    process.nextTick(() => resolve(teamSchedule))
  })
}

module.exports.getPlayers = getPlayers
module.exports.getTeamSchedule = getTeamSchedule
