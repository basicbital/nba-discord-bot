const { URLSearchParams } = require('url');
const fetch = require('node-fetch');



getYahooAuthCode = function() {
    const redirectURL = "oob";
    const responseType = "code";

    params = "?" + "client_id=" + process.env.YAHOO_KEY + "&" + "redirect_uri=" + redirectURL + "&" + "response_type=" + responseType;

    fetch('https://api.login.yahoo.com/oauth2/request_auth' + params)
        .then(res => {
            return res;
        })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(`${err}`)
        })

}

getYahooToken = function() {
    const params = new URLSearchParams({
        redirect_uri: "oob",
        code: "",
        grant_type: "authorization_code"
    })

    const headers = {
        "Authorization": "Basic " + process.env.SECRET,
        "content-type": "application/x-www-form-urlencoded"
    }

    const options = {
        method: 'POST',
        headers: headers,
        body: params
    }

    fetch('https://api.login.yahoo.com/oauth2/get_token', options)
        .then(res => {
            return res.json();
        })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(`${err}`)
        })

}

module.exports.getYahooAuthCode = getYahooAuthCode;
module.exports.getYahooToken = getYahooToken;