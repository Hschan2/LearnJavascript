const e = React.createElement;

// 컴포넌트 만들기
class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // 바뀔 여지가 있는 부분 (state -> 데이터라고 생각하면 쉽다. React가 알아서 화면을 일치 시켜준다)
            liked: false,
        };
    }

    render() {
        return <button onClick= {() => {this.setState({liked:true})}} type="submit">{this.state.liked === true ? '좋아요' : '싫어요'}</button> 
        // html 방식으로 사용 가능 => JSX (JS + XML). but 지원을 해주지 않기 때문에 babel을 사용해야 함
        
        // e('button', { onClick: () => {this.setState({liked:true})}, type: 'submit' }, this.state.liked === true ? 'Liked' : 'Like',);
        // <button onClick="() => {this.setState({liked:true})} type="submit"">Like</button>를 만들겠다는 의미. 만든다 X
        // setState => 값을 변경할 때 (상태를 설정하다)
        // $('button').text('Liked');
    }
}

ReactDOM.render(<LikeButton />, document.querySelector('#root')); 
// js + xml. JSX은 < /> 이 필수
// <LikeButton />는 컴포넌스. 갯수를 늘릴 수 있다

// ReactDOM.render(e(LikeButton), document.querySelector('#root'));
// ReactDOM => 실제로 화면에 띄우겠다. LikeButton을 root라는 id를 가진 곳에 실행하겠다
// 실제 HTML에서 <div id="root"><button>Like</button></div> 로 실행