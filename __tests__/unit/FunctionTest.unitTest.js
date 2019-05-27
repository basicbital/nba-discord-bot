const moment = require('moment')
const nbaUtils = require('../../util/nbaUtils')
const nbaData = require('../../api/nbaData')
jest.mock('../../api/nbaData') // mock nbaData, folder __mocks__ needs to be in same directory as module

describe('../util/nbaUtils', () => {
  test('getTeamId() returns team id for a given player name', async () => {
    let firstName = 'Jaylen'
    let lastName = 'Adams'
    let expectedId = '1610612737'
    const playersMock = await nbaData.getPlayers().then(resp => (resp))
    const teamId = nbaUtils.getTeamId(playersMock, firstName, lastName)
    console.log('getTeamId():\nExpected: ' + expectedId + '\nReceived: ' + teamId)
    expect(teamId).toBe(expectedId)
  })

  test('getGamesInWeek() returns number of games during a given week', async () => {
    let teamId = '1610612737'
    const teamScheduleMock = await nbaData.getTeamSchedule(teamId).then(resp => (resp))
    let daysInWeek = 7
    let days = []
    let day = moment('2018-10-01')
    for (let i = 0; i < daysInWeek; i++) {
      days.push(day.format('YYYYMMDD'))
      day.add(1, 'd')
    }
    let received = nbaUtils.getGamesInWeek(teamScheduleMock, days)
    let expected = 3
    console.log('getGamesInWeek: \nExpected: ' + expected + '\nReceived: ' + received)
    expect(received).toBe(expected)
  })

  test('getDaysPlayedOn() returns an array with dates', async () => {
    console.log('this test should return 3 dates that this team plays on for this given data: ')
    let teamId = '1610612737'
    let teamSchedule = await nbaData.getTeamSchedule(teamId).then(resp => (resp))
    let lastPlayedIndex = await nbaData.getLastPlayedIndex().then(resp => (resp))
    let testDate = moment('2018-10-01')
    let weekDates = nbaUtils.getDaysInWeek(testDate)
    let actual = nbaUtils.getDaysPlayedOn(teamSchedule, lastPlayedIndex, weekDates)
    console.log('Total Dates Played: ' + actual.length)
    // actual could be zero if league player no longer has active players in his roster
    expect(typeof actual).toBe('object')
    expect(actual.length).toBe(3)
  })

  test('getPlayersNbaLeagueId', async () => {
    const leagueName = 'SQA²'
    const expectedLeagueId = '194346'
    const loggedInUserMock = await nbaData.getPlayerLeagues().then(resp => (resp))
    console.log(loggedInUserMock)
    const leagueId = nbaUtils.getPlayersNbaLeagueId(loggedInUserMock, leagueName)
    console.log('getPlayersNbaLeagueId():\nExpected: ' + expectedLeagueId + '\nReceived: ' + leagueId)
    expect(leagueId).toBe(expectedLeagueId)
  })
})
