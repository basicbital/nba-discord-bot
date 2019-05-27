const utils = require('../../util/nbaUtils')
const yUtils = require('../../util/yahooUtils')
jest.setTimeout(10000)



describe('../../response_ui/ & ../../util/yahooUtils', () => {

  // test('getPlayerGamesThisWeek() returns formatted response for player games', async () => {
  //   let response = await ui.getPlayerGamesThisWeek('Jaylen', 'Adams')
  //   expect(typeof response).toBe('string')
  // })

  // test('createRosterDateMap(monday)', async () => {
  //   console.log('WIP')
  //   let rosterMap = await yUtils.createRosterDateMap().then(resp => (resp))
  //   console.log(rosterMap)
  // })

  test('displayUserMap() ', async () => {
    let userRoster = await yUtils.createRosterDateMap().then(resp => (resp))
    // let msg = utils.displayUserMap(userRoster)
    console.log(typeof userRoster)
    // expect(msg).not.toBeNull();
  })


})