const KakaoClient = require('./kaling');
const Kakao = new KakaoClient('id', 'pw', 'apiKey', 'url');

Kakao.replyLink('roomName', {
    link_ver: "4.0",
    template_id: 123123,
    template_args: {

    }
}, 'custom')