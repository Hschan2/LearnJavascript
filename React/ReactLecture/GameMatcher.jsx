import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import GuGuDan from './GuGuDan';
import Baseball from './Baseball';
import Lotto from './Lotto';

// Router에서 동적으로 처리하지 않았을 경우, 그래도 동적 처리 방식으로 사용하고 싶을 때, withRouter 사용
// 즉, history, match, location이 없을 경우
class GameMatcher extends Component {
    render() {
        console.log(this.props.match.params.name === 'gugudan');
        // 전달받은 값을 가져오기 (맨 앞에 ?을 분리하고 URLSearchParams에 넣기)
        let value = new URLSearchParams(this.props.location.search.slice(1));
        // hello라는 key값을 가진 것의 값 가져오기
        console.log(value.get('hello'));

        // 분기 처리하기 (Router에서 동적으로 처리할 경우 아래처럼 사용)
        if(this.props.match.params.name === 'gugudan') {
            return <GuGuDan />
        } else if(this.props.match.params.name === 'baseball') {
            return <Baseball />
        } else if(this.props.match.params.name === 'lotto') {
            return <Lotto />
        } else if(this.props.match.params.name === 'Baseball') {
            return <Baseball />
        }
        return (
            <div>
                일치하는 페이지가 없습니다.
            </div>
        );
    }
}

// withRouter 사용
export default withRouter(GameMatcher);
// export default GameMatcher;