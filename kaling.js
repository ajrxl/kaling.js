// @ts-nocheck
"use strict";
module.exports /** @class */ = (function () {
    const { CryptoJS } = require('./crypto');
    function Kakao(email, password, apiKey, url) {
        this.AuthURL = "https://accounts.kakao.com/weblogin/authenticate.json"
        this.linkURL = "https://sharer.kakao.com/talk/friends/picker/link";
        this.cookies = {};

        if(typeof email !== 'string') throw new TypeError("email type is must string");
        if(typeof password !== 'string') throw new TypeError("password type is must string");
        if(typeof apiKey !== 'string' || apiKey.length != 32) throw new TypeError("apiKey is not vaild");
        if(!/^http[s]?\:\/\//i.test(url)) throw new TypeError("url is not vaild");

        this.apiKey = apiKey;
        this.static = 'sdk/1.36.6 os/javascript lang/en-US device/Win32 origin/' + url
        const ApiKeyResponse = org.jsoup.Jsoup.connect(this.linkURL).requestBody("app_key="+apiKey+"&validation_action=default&validation_params={}&ka="+encodeURIComponent(this.static)+"&lcba=").method(org.jsoup.Connection.Method.POST).execute();
        if(ApiKeyResponse.statusCode() != 200) throw new Error("ApiKey Authorzaiton Error: " + ApiKeyResponse.statusCode());
        const cryptoKey = ApiKeyResponse.parse().select('input[name=p]').attr('value')
        const referer = ApiKeyResponse.url().toExternalForm();
        const AuthResponse = org.jsoup.Jsoup.connect(this.AuthURL).referrer(referer)
            .requestBody("os=web&webview_v=2&email="+CryptoJS.AES.encrypt(email, cryptoKey).toString()+"&password="+CryptoJS.AES.encrypt(password, cryptoKey).toString()+"&stay_signed_in=true&continue="+decodeURIComponent(referer.split("=")[1])+"&third=false&k=true")
            .method(org.jsoup.Connection.Method.POST).ignoreContentType(true).ignoreHttpErrors(true).execute();
        this.a = JSON.parse(AuthResponse.body()).status;
    }
    return Kakao;
})();