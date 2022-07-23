import React, {Component, PureComponent} from 'react';

// PureComponent => shouldComponentUpdate를 알아서 자동으로 구현한 컴포넌트
class Test extends PureComponent {
    // state의 값이 바뀌었는지 아닌지 PureComponent가 알아서 판단, but object나 array는 쉽게 판단하지 못하는 단점이 있음
    state = {
        counter: 0,
        string: 'hello',
        number : 1,
        boolean: true,
        object: {},
        array: [], // state로 둘 때 배열 안에 객체를 새로 만들지 말라. 간단하게 하라
    };

    // render처럼 react에서 지원
    // 직접 어떤 경우에 rendering을 다시 해주어야 하는지 적어주는 것
    // 일부만 렌더링하게 만들고 싶다. 커스텀하고 싶다할 때 PureComponent말고 shouldComponentUpdate를 사용
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if(this.state.counter !== nextState.counter) { // 현재 counter 값과 미래 바뀌는 counter값이 다르면 렌더링하라
    //         return true;
    //     }
    //     return false;
    // }

    onClick = () => {
        // const array = this.state.array; // for 불변성
        // array.push(5);
        this.setState({
            array: [...this.state.array, 1], // PureComponent가 판단할 수 있도록 이전 배열을 복사하는 방식으로 해야 한다. => 새로운 배열 생성 ==> 객체도 똑같이
            // array: [],
        }); // 값이 변화하지 않고 오로직 setState만 호출하였지만 rendering이 된다. => 문제. 큰 문제. => shouldComponentUpdate 사용
    };

    render() {
        console.log('Rendering...', this.state);
        return (
            <>
                <button onClick={this.onClick}></button>
            </>
        );
    }
}

export default Test;