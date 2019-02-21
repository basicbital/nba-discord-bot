const nbaUtils = require('../../util/nbaUtils');
const nbaData = require('../../api/nbaData');
const fetch = require('node-fetch');
const moment = require('moment');
const moment_timezone = require('moment-timezone');
const easternTime = moment_timezone().tz('America/New_York');


describe('../util/nbaUtils', ()=>{
    test('getTeamId()', async ()=>{
        let firstName = "Jaylen";
        let lastName = "Adams";
        let expectedId = "1610612737";
        const players = await nbaData.getPlayers().then(resp=>(resp));
        const teamId = nbaUtils.getTeamId(players, firstName, lastName);
        expect(teamId).toBe(expectedId);
    });

    

    /** TODO 2/25/19 this test needs to be completely refactored to take into account
     *  data from outside sources, hence need to use mocking framework. 
     *

    // test('getGamesInWeek() returns number of games', async ()=>{
    //     // not letting this test be dependent on whether getDaysInWeek is working or not
    
    //     // test parameters need to be changed on a weekly basis the way this is currently structured
    //     // possibly find a better way to test this
    //     let teamId = "1610612737";
    //     const teamSchedule = await nbaData.getTeamSchedule(teamId).then(resp=>(resp));
    //     let daysInWeek = 7;
    //     let days = [];
    //     let day = moment(easternTime).day("Monday");
    //     for(let i = 0; i < daysInWeek; i++){
    //         days.push(day.format("YYYYMMDD"));
    //         day.add(1,'d');
    //     }
    //     let received = nbaUtils.getGamesInWeek(teamSchedule, days);
    //     let expected = 2; // for the week of 2/17/2019 to 2/23/2019
    //     console.log("getGamesInWeek: \nExpected: " + expected + "\nReceived: " + received);
    //     expect(received).toBe(expected);
        
    // }); 
    */

    test('getCurrentMonday()', ()=>{
        // .day() sunday -> 0, so monday is 1
        let received = nbaUtils.getCurrentMonday().day();
        let expected = 1; // monday -> 1
        console.log("getCurrentMonday Log:\nReceived: " + received + "\nExpected: " + expected);
        expect(received).toBe(expected);
    });

    test('getPrevMonday()', ()=>{
        let received = nbaUtils.getPrevMonday();
        let expected = nbaUtils.getCurrentMonday().subtract(1,'w');
        console.log("getPrevMonday Log:\nReceived: " + received + "\nExpected: " + expected);
        expect(received).toEqual(expected);
    });

    test('getNextMonday()', ()=>{
        let received = nbaUtils.getNextMonday();
        let expected = nbaUtils.getCurrentMonday().add(1,'w');
        console.log("getNextMonday Log:\nReceived: " + received + "\nExpected: " + expected);
        expect(received).toEqual(expected);
    });

    test('getDaysInWeek() with currentMonday', ()=>{
        let received = nbaUtils.getDaysInWeek(nbaUtils.getCurrentMonday());

        let expected = [];
        let daysInWeek = 7;
        let day = moment(easternTime).day("Monday");
        for( let i = 0; i < daysInWeek; i++){
            expected.push(day.format("YYYYMMDD"));
            day.add(1, 'd');
        }    

        console.log("getDaysInWeek with currentMonday" + "\nExpected: \nMonday: " + expected[0] + "\nTuesday: " + expected[1] + "\nWednesday: " +
        expected[2] + "\nThursday: " + expected[3] + "\nFriday: " + expected[4] + "\nSaturday: " +
        expected[5] + "\nSunday: " + expected[6] + "\n\nReceived: \nMonday: " + received[0] + "\nTuesday: " + received[1] + "\nWednesday: " +
        received[2] + "\nThursday: " + received[3] + "\nFriday: " + received[4] + "\nSaturday: " +
        received[5] + "\nSunday: " + received[6]);
        expect(received).toEqual(expected);
    });

    test('getDaysInWeek() with prevMonday', ()=>{
        let received = nbaUtils.getDaysInWeek(nbaUtils.getPrevMonday());
        let expected = [];
        let daysInWeek = 7;
        let day = moment(easternTime).day("Monday");
        day.subtract(7, 'd');
        for(let i = 0; i < daysInWeek; i++){
            expected.push(day.format("YYYYMMDD"));
            day.add(1,'d');
        }
        
        console.log("getDaysInWeek with prevMonday" + "\nExpected: \nMonday: " + expected[0] + "\nTuesday: " + expected[1] + "\nWednesday: " +
        expected[2] + "\nThursday: " + expected[3] + "\nFriday: " + expected[4] + "\nSaturday: " +
        expected[5] + "\nSunday: " + expected[6] + "\n\nReceived: \nMonday: " + received[0] + "\nTuesday: " + received[1] + "\nWednesday: " +
        received[2] + "\nThursday: " + received[3] + "\nFriday: " + received[4] + "\nSaturday: " +
        received[5] + "\nSunday: " + received[6]);
        expect(received).toEqual(expected);
    });

    test('getDaysInWeek() with nextMonday', ()=>{
        let received = nbaUtils.getDaysInWeek(nbaUtils.getNextMonday());
        let expected = [];
        let daysInWeek = 7;
        let day = moment(easternTime).day("Monday");
        day.add(7, 'd');
        for(let i = 0; i < daysInWeek; i++){
            expected.push(day.format("YYYYMMDD"));
            day.add(1,'d');
        }

        console.log("getDaysInWeek with nextMonday" + "\nExpected: \nMonday: " + expected[0] + "\nTuesday: " + expected[1] + "\nWednesday: " +
        expected[2] + "\nThursday: " + expected[3] + "\nFriday: " + expected[4] + "\nSaturday: " +
        expected[5] + "\nSunday: " + expected[6] + "\n\nReceived: \nMonday: " + received[0] + "\nTuesday: " + received[1] + "\nWednesday: " +
        received[2] + "\nThursday: " + received[3] + "\nFriday: " + received[4] + "\nSaturday: " +
        received[5] + "\nSunday: " + received[6]);
        expect(received).toEqual(expected);
    });
})