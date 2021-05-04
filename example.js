const KakaoClient = require('./kaling');
const Kakao = new KakaoClient('id', 'pw', 'apiKey', 'url');

Kakao.replyLink('roomName', {
    "params": "1"
}, "type")