import React, { Component } from 'react';
import BingoNum from './random';
import {actions} from '../reducer/reducer';
import {connect} from 'react-redux';
import './button.css'

let p1board = new Array(25);
let p2board = new Array(25);

let p1board_count = 0;
let p2board_count = 0;

let p1array;
let p2array;

class Board extends Component {
  ArrayState(check_num) {
    for(let i=0; i<5; i++){
      for(let j=0; j<5; j++){
        if(p1array[i][j] === check_num) {
          p1board[i][j]= 1;
        }
        if(p2array[i][j] === check_num) {
          p2board[i][j]= 1;
        }
      }
    }
  }

  render() {
    return(
      // 행 5, 열 5로 만들어야 한다.
      <div>
        <table>
          <tr>
            <td><button className="cellBtn" onClick=""></button></td>
          </tr>
        </table>
      </div>
    )
  }
}

// component와 view 연결
// component의 props에 매핑할 상태를 정의
// 기존 React Component 내부의 constructor()
const mapStateToProps = (state) => {
    const {p1board, p2board} = state;
    return {
      p1board,
      p2board
    }
};

// dispatcher(데이터 갱신)를 component의 props에 매핑
const mapDispatchToProps = (dispatch) => {
  return {
    
  }
};

// 연결
export default connect(mapStateToProps, mapDispatchToProps)(Board);