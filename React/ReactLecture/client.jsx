const React = require('react');
const ReactDom = require('react-dom');
const {hot} = require('react-hot-loader/root'); // 웹 수정을 실시간으로 적용

const GuGuDan = require('./GuGuDan');
const WordRelay = require('./WordRelay'); // WordRelay.jsx 불러오기. webpack이 알아서 파악하고 무엇이 무엇을 불러와야 하는지 스스로 동작
const baseBall = require(`./Baseball`);
const ResponseCheck = require('./ResponseCheck');
const RSP = require('./RSP');
const Lotto = require('./Lotto');
const TicTacToc = require('./TicTacToc');

const Hot = hot(TicTacToc); // 수정 사항 있을 시 알아서 반영

ReactDom.render(<Hot />, document.querySelector('#root')); // jsx 문법