const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 경고를 없애기 위해 'development' 모드로 설정
    mode: 'development',

    // Webpack이 번들링을 시작할 진입점 파일
    entry: './src/index.tsx',

    // 번들링된 파일을 저장할 위치 및 파일명
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    // 로더 설정을 통해 다양한 파일 확장자 처리
    module: {
        rules: [
            {
                test: /\.tsx?$/, // .ts나 .tsx 파일을 찾음
                use: 'ts-loader', // 찾은 파일을 ts-loader로 처리
                exclude: /node_modules/,
            },
            {
                test: /\.css$/, // .css 파일을 찾음
                use: ['style-loader', 'css-loader'], // 찾은 파일을 style-loader와 css-loader로 처리
            },
        ],
    },

    // 모듈의 확장자 처리
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },

    // 개발 서버 설정
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'), // 'dist' 폴더를 정적 파일 서버로 사용
        },
        compress: true,
        port: 8080,
    },

    // 플러그인 설정
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html' // ./src/index.html을 템플릿으로 사용
        })
    ]
};