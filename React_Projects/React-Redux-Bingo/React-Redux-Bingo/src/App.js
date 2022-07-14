import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducer/reducer';
import Bingo from './container/index'

// react redux => 필요한 부분만 변경 가능하기에 빠른 속도, 단방향 데이터 흐름
// 데이터가 늘어갈 때마다 복잡도가 증가하기 때문에 더 쉽고 정돈된 형태로 사용가능한 redux library 사용

let store = createStore(reducer); // redux 사용하기 위해 createStore, reducer 상태 반환

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Bingo />
        </Provider>
      </div>
    );
  }
}

export default App;
