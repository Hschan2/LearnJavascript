const path = require('path');
const webpack = require('webpack');
// process.env.NODE_ENV = 'production'; => 실제 서비스를 할 시 환경 변수를 production으로 설정

module.exports = {
    name: 'word-relay-setting',
    mode: 'development', // 실제 서비스를 할 시: production로 변경
    devtool: 'eval',
    resolve: { // 알아서 해당 js파일과 jsx파일이 있는지 파악
        extensions: [ // 확장자. .jsx , .js 생략 가능
            '.js', '.jsx'
        ]
    },

    entry: { // 중요. 입력
        app: ['./client', './GuGuDan', './WordRelay', './Baseball.jsx', './ResponseCheck.jsx', './RSP.jsx', './Binding.jsx', './Lotto.jsx', './TicTacToc.jsx',],
    },

module: {
    rules: [{
        test: /\.jsx?/,
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // 기본형
            // 조건을 부여할 때, (이전 버전 브라우저는 필요 없음을 조건으로 할 때)
            // presets: [
            //     ['@babel/preset-env', {
            //         targets: {
            //             browsers: ['last 2 chrome versions', '> 5% in KR], 크롬에서 지난 2개 버전부터 지원 x, 한국어 사용 빈도가 5%인 나라에서 사용
            //         },
                    // debug: true => 개발용
            //     }],
            // ]
            // github.com/browserslist에서 확인 가능
            plugins: ['@babel/plugin-proposal-class-properties', 'react-hot-loader/babel',],
        },
    }],
},
    plugins: [
        // new webpack.LoaderOptionsPlugin({debug: true}), // 옵션에 debug: true를 모두 넣어준다
    ], // 확장 프로그램이라고 생각. 기본 적용 외 추가할 것들
    output: { // 중요. 출력
        path: path.join(__dirname, 'dist'), // => 폴더 하나로 합치기
        filename: './app.js', // 출력할 js 파일
        publicPath: '/dist/', // 경로(가상 경로)를 dist 폴더 이하로 설정
    },
}