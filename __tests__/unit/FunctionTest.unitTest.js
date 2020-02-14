const moment = require('moment')
const nbaUtils = require('../../util/nbaUtils')
const nbaData = require('../../api/nbaData')
jest.mock('../../api/nbaData') // mock nbaData, folder __mocks__ needs to be in same directory as module

describe('../util/nbaUtils', () => {
  test('GetTeamId_GivenJsonFirstLastName_Number', async () => {
    let firstName = 'Jaylen'
    let lastName = 'Adams'
    let expectedId = '1610612737'
    const playersMock = await nbaData.getPlayers().then(resp => (resp))
    const teamId = nbaUtils.getTeamId(playersMock, firstName, lastName)
    console.log('getTeamId():\nExpected: ' + expectedId + '\nReceived: ' + teamId)
    expect(teamId).toBe(expectedId)
  })

  test('GetGamesInWeek_GivenJsonAndArrayOfWeekDays_SameNumber', async () => {
    // This function should return the number of games that a team is playing for some given week
    let teamId = '1610612737'
    const teamScheduleMock = await nbaData.getTeamSchedule(teamId).then(resp => (resp))
    // days per our logic start on monday
    // Monday 1st day
    // Tuesday 2nd day
    // and so on
    let daysInWeek = 7
    let days = []
    let day = moment('2019-10-14') // a monday to make things easier
    for (let i = 0; i < daysInWeek; i++) {
      days.push(day.format('YYYYMMDD'))
      day.add(1, 'd')
    }
    let received = nbaUtils.getGamesInWeek(teamScheduleMock, days)
    let expected = 3
    console.log('getGamesInWeek: \nExpected: ' + expected + '\nReceived: ' + received)
    expect(received).toBe(expected)
    // checking the json file http://data.nba.net/10s/prod/v1/2019/teams/1610612737/schedule.json
    // which may or may not exist in the future shows that on that week team 1610612737 played 3 games
  })

  test('GetDaysPlayedOn_GivenJsonLastPlayedIndexArrayofDaysInWeek_ArrayWithObjects', async () => {
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

  test('DisplayUserMap_PlayerDatePlayingDictionary_StringArrayFormattedContent', () => {
    // const charMax = 10
    console.log('Long Names should be truncated')
    console.log('Multiple spaces are truncated')
    console.log('Apostrophes and periods are correctly displayed')
    const longName = 'Kentavious Caldwell-PopeisDopeus'
    const shortName = 'Short Name'
    const multSpaces = 'Bad  Name'
    const juniors = 'Junior jr.'
    const apostrophes = 'Shaq O\'Neal'
    // const dotsInMiddle = 'Dot .WhoHasThisName'  // in case ai's become real and have functions as last name...
    const reallyLongName = 'Looooooooooooooooooooooooooong long'
    const playersPlayingThisWeek = [{
      0: ['Monday', '06-23-2019', longName, shortName],
      1: ['Tuesday', '06-23-2019', multSpaces, juniors, shortName, reallyLongName],
      2: ['Wednesday', '06-23-2019', apostrophes, shortName],
      3: ['Thursday', '06-23-2019', shortName, reallyLongName, shortName],
      4: ['Friday', '06-23-2019'],
      5: ['Saturday', '06-23-2019'],
      6: ['Sunday', '06-23-2019']
    }]
    // let startIndex = 2
    // for (let index = 0; index < 7; index++) {
    //   playersPlayingThisWeek[0][index].slice(startIndex).forEach(name => {
    //     console.log('Player name: ' + name + '\r\n' + 'LengthMax?: ' + (name.length > charMax))
    //     if (name.length > charMax) {
    //       console.log('Expected long name')
    //     }
    //     expect(name.length > charMax).toBe(true)
    //   })
    // }
    const userMap = nbaUtils.displayUserMap(playersPlayingThisWeek)
    console.log(userMap)
  })

  test('GetPlayersNbaLeagueId_GivenJsonStringOfLeagueID_SringOfLeagueID', async () => {
    const leagueName = 'SQA²'
    const expectedLeagueId = '194346'
    const loggedInUserMock = await nbaData.getPlayerLeagues().then(resp => (resp))
    console.log(loggedInUserMock)
    const leagueId = nbaUtils.getPlayersNbaLeagueId(loggedInUserMock, leagueName)
    console.log('getPlayersNbaLeagueId():\nExpected: ' + expectedLeagueId + '\nReceived: ' + leagueId)
    expect(leagueId).toBe(expectedLeagueId)
  })
})

jest.unmock('../../api/nbaData')
describe('../api/nbaData.js', () => {
  let teamId = '1610612737'
  test('GetNbaYear_NoParam_ReturnsAYear', async () => {
    let received = await nbaData.getNbaYear().then(resp => (resp))
    console.log('Year received from nba.net: ' + received)
    expect(typeof received).toBe('number')
  })

  test('GetPlayers_NoParam_FirstNameField', async () => {
    let received = await nbaData.getPlayers().then(resp => (resp))
    console.log('Object.keys(received.slice(0)[0])[0] should return the first field in standard... firstName')
    expect(Object.keys(received.slice(0)[0])[0]).toBe('firstName')
  })

  test('GetTeamSchedule_GivenTeamID_FieldSeasonStageIDField', async () => {
    console.log('teamId give: ' + teamId)
    let received = await nbaData.getTeamSchedule(teamId).then(resp => (resp))
    // received gets all data for standard
    console.log('Object.keys(received.slice(0)[0])[0]) should return the first field in standard index 0, which is seasonStageId')
    expect(Object.keys(received.slice(0)[0])[0]).toBe('seasonStageId')
  })

  test('GetLastPlayedIndex_GivenTeamID_NumberIndex', async () => {
    let received = await nbaData.getLastPlayedIndex(teamId).then(resp => (resp))
    console.log('Received is: ' + received)
    expect(typeof received).toBe('number')
  })
  test('GetFirstPlayer_NoParam_ReceiveNameString', async () => {
    let received = await nbaData.getFirstPlayer().then(resp => (resp))
    console.log('Received a name...: ' + received)
    expect(typeof received).toBe('string')
  })
})
