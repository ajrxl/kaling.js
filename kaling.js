// @ts-nocheck
"use strict";
module.exports /** @class */ = (function () {
    const { CryptoJS } = require('./crypto');
    function Kakao(email, password, apiKey, url) {
        this.AuthURL = "https://accounts.kakao.com/weblogin/authenticate.json"
        this.linkURL = "https://sharer.kakao.com/talk/friends/picker/link";
        this.getTIARA = "https://track.tiara.kakao.com/queen/footsteps";
        this.cookies = {};

        if(typeof email !== 'string') throw new TypeError("email type is must string");
        if(typeof password !== 'string') throw new TypeError("password type is must string");
        if(typeof apiKey !== 'string' || apiKey.length != 32) throw new TypeError("apiKey is not valid");
        if(!/^http[s]?\:\/\//i.test(url)) throw new TypeError("url is not valid");

        this.apiKey = apiKey;
        this.static = 'sdk/1.36.6 os/javascript lang/en-US device/Win32 origin/' + url
        const ApiKeyResponse = org.jsoup.Jsoup.connect(this.linkURL).requestBody("app_key="+apiKey+"&validation_action=default&validation_params={}&ka="+encodeURIComponent(this.static)+"&lcba=").method(org.jsoup.Connection.Method.POST).execute();
        if(ApiKeyResponse.statusCode() != 200) throw new Error("ApiKey Authorzaiton Error: " + ApiKeyResponse.statusCode());
        const cryptoKey = ApiKeyResponse.parse().select('input[name=p]').attr('value')
        const referer = ApiKeyResponse.url().toExternalForm();
        this.cookies = {
            _kadu: ApiKeyResponse.cookie('_kadu'),
            _kadub: ApiKeyResponse.cookie('_kadub'),
            _maldive_oauth_webapp_session: ApiKeyResponse.cookie('_maldive_oauth_webapp_session'),
            TIARA: org.jsoup.Jsoup.connect(this.getTIARA).ignoreContentType(true).method(org.jsoup.Connection.Method.GET).execute().cookie('TIARA')
        } //set COOKIE
        const AuthResponse = org.jsoup.Jsoup.connect(this.AuthURL).referrer(referer).cookies(this.cookies)
            .requestBody("os=web&webview_v=2&email="+CryptoJS.AES.encrypt(email, cryptoKey).toString()+"&password="+CryptoJS.AES.encrypt(password, cryptoKey).toString()+"&stay_signed_in=true&continue=https%3A%2F%2Fsharer.kakao.com%2Ftalk%2Ffriends%2Fpicker%2F&third=false&k=true")
            .method(org.jsoup.Connection.Method.POST).ignoreContentType(true).ignoreHttpErrors(true).execute();
        this.a = JSON.parse(AuthResponse.body()).status;
    }

    Kakao.prototype.replyLink = function (roomName, params, type) {
        if(typeof params == 'object') throw new Error("params is must JSON");
    }
    return Kakao;
})();