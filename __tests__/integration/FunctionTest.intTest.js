const nbaUtils = require('../../util/nbaUtils')
const nbaData = require('../../api/nbaData')
const moment = require('moment')
const momentTimeZone = require('moment-timezone')
const easternTime = momentTimeZone().tz('America/New_York')
const yUtils = require('../../util/yahooUtils')
jest.setTimeout(10000)

describe('../util/nbaUtils', () => {
  test('getTeamId()', async () => {
    let firstName = 'Jaylen'
    let lastName = 'Adams'
    let expectedId = '1610612737'
    const players = await nbaData.getPlayers().then(resp => (resp))
    const teamId = nbaUtils.getTeamId(players, firstName, lastName)
    expect(teamId).toBe(expectedId)
  })

  test('getCurrentMonday()', () => {
    // day() returns day index, sunday -> 0, so monday is 1
    let received = nbaUtils.getCurrentMonday().day()
    let expected = 1 // monday -> 1
    console.log('getCurrentMonday Log:\nReceived: ' + received + '\nExpected: ' + expected)
    expect(received).toBe(expected)
  })

  test('getPrevMonday()', () => {
    let received = nbaUtils.getPrevMonday()
    let expected = nbaUtils.getCurrentMonday().subtract(1, 'w')
    console.log('getPrevMonday Log:\nReceived: ' + received + '\nExpected: ' + expected)
    expect(received).toEqual(expected)
  })

  test('getNextMonday()', () => {
    let received = nbaUtils.getNextMonday()
    let expected = nbaUtils.getCurrentMonday().add(1, 'w')
    console.log('getNextMonday Log:\nReceived: ' + received + '\nExpected: ' + expected)
    expect(received).toEqual(expected)
  })

  test('getDaysInWeek() with currentMonday', () => {
    let received = nbaUtils.getDaysInWeek(nbaUtils.getCurrentMonday())

    let expected = []
    let daysInWeek = 7
    let day = moment(easternTime).day('Monday')
    for (let i = 0; i < daysInWeek; i++) {
      expected.push(day.format('YYYYMMDD'))
      day.add(1, 'd')
    }

    console.log('getDaysInWeek with currentMonday' + '\nExpected: \nMonday: ' + expected[0] + '\nTuesday: ' + expected[1] + '\nWednesday: ' +
        expected[2] + '\nThursday: ' + expected[3] + '\nFriday: ' + expected[4] + '\nSaturday: ' +
        expected[5] + '\nSunday: ' + expected[6] + '\n\nReceived: \nMonday: ' + received[0] + '\nTuesday: ' + received[1] + '\nWednesday: ' +
        received[2] + '\nThursday: ' + received[3] + '\nFriday: ' + received[4] + '\nSaturday: ' +
        received[5] + '\nSunday: ' + received[6])
    expect(received).toEqual(expected)
  })

  test('getDaysInWeek() with prevMonday', () => {
    let received = nbaUtils.getDaysInWeek(nbaUtils.getPrevMonday())
    let expected = []
    let daysInWeek = 7
    let day = moment(easternTime).day('Monday')
    day.subtract(7, 'd')
    for (let i = 0; i < daysInWeek; i++) {
      expected.push(day.format('YYYYMMDD'))
      day.add(1, 'd')
    }

    console.log('getDaysInWeek with prevMonday' + '\nExpected: \nMonday: ' + expected[0] + '\nTuesday: ' + expected[1] + '\nWednesday: ' +
        expected[2] + '\nThursday: ' + expected[3] + '\nFriday: ' + expected[4] + '\nSaturday: ' +
        expected[5] + '\nSunday: ' + expected[6] + '\n\nReceived: \nMonday: ' + received[0] + '\nTuesday: ' + received[1] + '\nWednesday: ' +
        received[2] + '\nThursday: ' + received[3] + '\nFriday: ' + received[4] + '\nSaturday: ' +
        received[5] + '\nSunday: ' + received[6])
    expect(received).toEqual(expected)
  })

  test('getDaysInWeek() with nextMonday', () => {
    let received = nbaUtils.getDaysInWeek(nbaUtils.getNextMonday())
    let expected = []
    let daysInWeek = 7
    let day = moment(easternTime).day('Monday')
    day.add(7, 'd')
    for (let i = 0; i < daysInWeek; i++) {
      expected.push(day.format('YYYYMMDD'))
      day.add(1, 'd')
    }

    console.log('getDaysInWeek with nextMonday' + '\nExpected: \nMonday: ' + expected[0] + '\nTuesday: ' + expected[1] + '\nWednesday: ' +
        expected[2] + '\nThursday: ' + expected[3] + '\nFriday: ' + expected[4] + '\nSaturday: ' +
        expected[5] + '\nSunday: ' + expected[6] + '\n\nReceived: \nMonday: ' + received[0] + '\nTuesday: ' + received[1] + '\nWednesday: ' +
        received[2] + '\nThursday: ' + received[3] + '\nFriday: ' + received[4] + '\nSaturday: ' +
        received[5] + '\nSunday: ' + received[6])
    expect(received).toEqual(expected)
  })

  /// TODO: Need to implement a way to get accessToken. Blocked by CH-24/CH-30
  /// need credentials to access this data
  /// can probably mock accessToken here?
  // test('getAllPlayerNames() returns list of player names', async () => {
  //   const leagueId = 194346
  //   const teamId = Math.floor(Math.random() * 10) + 1 // Random number between [1, 10]
  //   const accessToken = '' // WIP need way to easily get access token
  //   const rawRoster = await nbaData.getPlayerRoster(accessToken, leagueId, teamId).then(resp => (resp))
  //   let players = nbaUtils.getAllPlayerNames(rawRoster)
  //   players.forEach(received => {
  //     console.log('First name of player:  Expected: <string>\nReceived: ' + received.firstName)
  //     expect(received.firstName).toEqual(expect.any(String))
  //     console.log('Last name of player:  Expected: <string>\nReceived: ' + received.lastName)
  //     expect(received.lastName).toEqual(expect.any(String))
  //   })
  // })
})

describe('../../util/yahooUtils', () => {
  test('createRosterDateMap()', async () => {
    let mondayStart = 1
    let userRoster = await yUtils.createRosterDateMap(mondayStart).then(resp => (resp))
    let printRoster = 'Roster gathered from yahoo api: \n'
    expect(userRoster).not.toBeNull()
    if(moment().format('dddd') === 'Sunday')
      mondayStart = mondayStart + (-7)
    for (let index = 0; index < 7; index++) {
      expect(userRoster[0][index][1]).toBe(moment().day(index+mondayStart).format('M-D-YY'))
      for (let player in userRoster[0][index]) {
        if (!(/^\b(Mon|Tues|Wednes|Thurs|Fri|Satur|Sun)day\b[\s\S]*$/.test(userRoster[0][index][player])) &&
        !moment(userRoster[0][index][player], 'MM-DD-YY').isValid()) {
          // filter weekdays and dates strings, the remainder should be player names
          printRoster += userRoster[0][index][player] + '\n'
          expect(typeof userRoster[0][index][player]).toBe('string')
          expect((/^[a-z ,.'-]+$/i.test(userRoster[0][index][player]))).toBeTruthy()
        }
      }
    }
    console.log(printRoster)
  })
})
