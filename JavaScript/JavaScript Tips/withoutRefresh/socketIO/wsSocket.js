const websocket = require("ws");

module.exports = (server) => {
    const wss = new websocket.Server({ server });

    // 이벤트 리스너 처리 (웹 소켓 연결 후)
    wss.on('connection', (ws, req) => {
        // 웹 소켓 연결 시
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        console.log("새로운 클라이언트 접속 ", ip);

        // 클라이언트로부터 메세지 수신
        ws.on('message', (message) => {
            console.log(message);
        });

        // 에러 처리
        ws.on('error', (error) => {
            console.log(error);
        });

        // 연결 종료
        // clearInterval 필수: 메모리 누수 방지
        ws.on('close', () => {
            console.log("클라이언트 접속 해제 ", ip);
            clearInterval(ws.interval);
        });

        /*
            웹 소켓 객체(WS)의 이벤트 리스너: message, error, close
            웹 소켓 상태: Connection, OPEN, Closing, Closed
        */

        // ws.send 메서드: 하나의 클라이언트에 메세지 전송
        ws.interval = setInterval(() => {
            // 3초마다 클라이언트로 메세지 전송
            if (ws.readyState === ws.OPEN) {
                ws.send("서버에서 클라이언트로 메세지 전송");
            }
        }, 3000);
    });
};