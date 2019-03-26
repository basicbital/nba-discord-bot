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
})
