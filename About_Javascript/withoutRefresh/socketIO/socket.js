// 새로고침 없이 데이터가 새로 추가되거나 변경이 되었을 때 실시간으로 반영되는 방법

// 양방향 통신을 위한 웹 소켓 사용은 WS 혹은 Socket.io 등의 패키지를 사용하여 가능하게 한다.
// 간단한 웹 소켓을 사용할 때는 WS 패키지를, 구현하고자 하는 서비스가 복잡해진다면 SocketIO를 사용하는 것이 좋다.

// 새로고침이 없이 데이터를 업데이트 하는 방법 중 SocketIO를 사용하기도 한다.

const SocketIO = require('socket.io');

module.exports = (server) => {
    const io = SocketIO(server, {
        // path: 클라이언트와 연결할 수 있는 경로
        path: '/socket.io'
    });

    // 연결
    io.on('connection', (socket) => {
        const request = socket.request;
        const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;

        console.log("새로운 클라이언트 접속", ip, socket.id);

        // 이벤트 리스너
        socket.on("disconnect", () => {
            console.log("클라이언트 접속 해제", ip, socket.id);
            clearInterval(socket.interval);
        })

        socket.on("error", (error) => {
            console.log(error);
        })

        socket.on("reply", (data) => {
            console.log(data);
        })

        // 3초 간격으로 클라이언트에 이벤트 전송
        socket.interval = setInterval(() => {
            socket.emit("news", "Hello SocketIO.IO");
        }, 3000);
    });
};

// npm start로 서버 실행

// 처음부터 웹 소캣만 사용하는 방법
// var socket = io.connect('http://localhost:3000', {
//   path:'/socket.io',
//   transports: ['websocket']
// });