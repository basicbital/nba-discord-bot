const moment = require('moment')
const momentTimeZone = require('moment-timezone')
const easternTime = momentTimeZone().tz('America/New_York')
const nbaData = require('../../api/nbaData')
const nbaUtils = require('../../util/nbaUtils')
jest.mock('../../api/nbaData.js')

const getFirstPlayerMock = async function () {
  return nbaData.getPlayers().then(resp => (resp))
}

describe('../util/nbaUtils', () => {
  let firstPlayerMock
  let firstName
  let lastName
  beforeAll(async () => {
    firstPlayerMock = await getFirstPlayerMock()
    firstName = firstPlayerMock[0].firstName
    lastName = firstPlayerMock[0].lastName
  })
  test('GetTeamId_ProvidedFirstLastName_ReturnsExpectedID', async () => {
    const expectedId = firstPlayerMock[0].teamId
    const teamId = nbaUtils.getTeamId(firstPlayerMock, firstName, lastName)
    console.log('Test: GetTeamId_ProvidedFirstLastName_ReturnsExpectedID' +
        '\nFirst Name: ' + firstName + '\nLast Name: ' + lastName +
        '\nExpected Id: ' + expectedId + '\nReceived Id: ' + teamId)
    expect(teamId).toBe(expectedId)
  })

  test('GetTeamId_ProvidesNullFirstName_ReturnsZero', async () => {
    let invalidFirstName = null
    const expectedId = 0
    const receivedId = nbaUtils.getTeamId(firstPlayerMock, invalidFirstName, lastName)
    console.log('Test: GetTeamId_ProvidesNullFirstName_ReturnsZero' +
      '\nFirst Name: ' + invalidFirstName + '\nLast Name: ' + lastName +
      '\nExpected Id: ' + expectedId + '\nReceived Id: ' + receivedId)
    expect(receivedId).toBe(expectedId)
  })

  test('GetTeamId_NullDataParam_ReturnsZero', async () => {
    let invalidData = null
    const expectedId = 0
    const receivedId = nbaUtils.getTeamId(invalidData, firstName, lastName)
    console.log('Test: GetTeamId_NullDataParam_ReturnsZero' +
    '\nFirst Name: ' + firstName + '\nLast Name: ' + lastName +
    '\nExpected Id ' + expectedId + '\nReceived Id: ' + receivedId)
    expect(receivedId).toBe(expectedId)
  })

  test('GetCurrentMonday_NoParam_IsTypeOfString', () => {
    const receivedMoment = nbaUtils.getCurrentMonday().format('MM-DD-YYYY')
    console.log('Test: GetTeamId_NullDataParam_ReturnsZero' +
    '\nReceived : ' + receivedMoment + ', Type of: ' + typeof receivedMoment)
    expect(typeof receivedMoment).toBe('string')
  })

  test('GetPrevMonday_NoParam_IsTypeOfString', () => {
    const receivedMoment = nbaUtils.getPrevMonday().format('MM-DD-YYYY')
    console.log('Test: GetPrevMonday_NoParam_IsTypeOfString' +
      '\nReceived: ' + receivedMoment + ', Type of: ' + typeof receivedMoment)
    expect(typeof receivedMoment).toBe('string')
  })

  test('GetNextMonday_NoParam_IsTypeOfString', () => {
    const receivedMoment = nbaUtils.getNextMonday().format('MM-DD-YYYY')
    console.log('Test: GetPrevMonday_NoParam_IsTypeOfString' +
      '\nReceived: ' + receivedMoment + ', Type of: ' + typeof receivedMoment)
    expect(typeof receivedMoment).toBe('string')
  })

  test('GetDaysInWeek_SupplyMondayDate_ReturnsArray', () => {
    const monDate = moment(easternTime).day('Monday')
    const receivedArray = nbaUtils.getDaysInWeek(monDate)
    console.log('mondate: ' + monDate + 'receivedArray: ' + receivedArray + '\ntype of array: ' + Array.isArray([]))
  })
})
