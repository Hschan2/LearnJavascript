import React from 'react';
import { BrowserRouter, Route, Link, HashRouter, Switch } from 'react-router-dom';
import GuGuDan from './GuGuDan';
import Ball from './Ball';
import Lotto from './Lotto';
import GameMatcher from './GameMatcher';
import Baseball from './Baseball';

const webRouter = () => {
    return (
        // 페이지가 실제로는 존재하지 않고 존재하는 척, 페이지가 하나에서 실행
        // 이는 서버에 요청하는 방식이 아닌 화면에 페이지가 있는 척하는 것. 즉, 프론트엔드만 동작
        <BrowserRouter>

        {/* // HashRouter는 새로고침을 해도 페이지가 보인다. 브라우저가 기억, 서버에서는 모르기 때문에 검색 엔진 등에서 불이익. 잘 사용하지 않음
        // 관리자 페이지에서 사용 가능
        // <HashRouter> */}
            {/* Route path로 실제로 이동하는 화면에 보이는 링크 */}
            {/* 주소창에 /GuGuDan를 적어서 접속할 시 에러, 이 방식은 서버에 요청하는 것이기 때문 */}
            <div>
                {/* 공통인 부분 */}
                {/* 페이지를 이동해도 바뀌지 않는다 */}
                {/* Route를 동적으로 처리했을 경우, /game/GuGuDan... 으로 설정하면 가능 */}
                {/* Route를 일반적으로 설정했을 경우, /GuGuDan 등처럼 설정해야 한다 */}
                <Link to = "/game/GuGuDan">구구단 게임</Link>
                $nbsp;
                <Link to = "/game/Ball">숫자야구</Link>
                $nbsp;
                <Link to = "/game/Lotto">로또게임</Link>
                $nbsp;
                {/* 동적으로 처리하기, index 등 아무 이름으로 설정 가능 */}
                <Link to = "/game/index">메인</Link>
                $nbsp;
                {/* Query로 값 넘기기 (QueryString) */}
                <Link to = "/game/Baseball?query=10&hello=hong&bye=react">메인</Link>
            </div>
            <div>
                {/* path => link, component => 실제로 보여질 것 */}
                {/* Router가 자동으로 컴포넌트를 연결지어 준다 */}
                <Route path = "/GuGuDan" component = {GuGuDan}></Route>
                <Route path = "/Ball" component = {Ball}></Route>
                <Route path = "/Lotto" component = {Lotto}></Route>
                <Route path = "/Baseball" component = {Baseball}></Route>
                {/* 많은 라우터를 사용하는 대신 동적으로 처리하는 방법 (Dynamic Router) */}
                {/* :name => params, 이는 동적으로 처리 */}
                {/* 아래처럼 설정할 경우, 아래 하나의 Route만 있고 Link에서 설정 가능 */}
                <Route path = "/game/:name" component = {GameMatcher}></Route>

                {/* Route에서 props 전달하기 */}
                <Route path="/game/:name" Component={() => <GameMatcher props="123456" />} />
                
                {/* 부모에서 props 전달 받기, props 전달받기 위한 용도라면 추천 */}
                {/* props 안에 history, match, location이 들어 있음 */}
                <Route path="/game/:name" render={(props) => <GameMatcher {...props} />} />
                <Route path="/game/Baseball" render={(props) => <GameMatcher {...props} />} />
                {/* 위 처럼 두 개의 Route를 설정할 시, 아래 Baseball은 어느 페이지에 나오게 설정하게 되므로 계속 출력 */}
                
                {/* Switch를 사용할 경우, 첫 번째의 Route가 불러오는 것과 같을 때 아래 Route는 무시 */}
                {/* 다른 Route가 의도적으로 두 번 나오게 만들 의도가 아니라면 사용 */}
                <Switch>
                    <Route path="/game/:name" render={(props) => <GameMatcher {...props} />} />
                    <Route path="/game/Baseball" render={(props) => <GameMatcher {...props} />} />
                    <Route path="/game/Baseball" render={(props) => <GameMatcher {...props} />} />
                    <Route path="/game/Baseball" render={(props) => <GameMatcher {...props} />} />
                    <Route path="/game/Baseball" render={(props) => <GameMatcher {...props} />} />
                </Switch>

                {/* Switch 외 다른 방법, exact => path가 정확하게 일치할 때만 Rendering */}
                {/* path="/"일 경우 (상위 주소), 포함되어 있기 때문에 Rendering. /도 일치한다고 인식하기 때문에 => Switch로도 해결 불가능 */}
                {/* 이럴 경우, path="/"를 가진 Route에 exact를 추가하면 해결 가능 */}
                <Switch>
                    <Route exact path="/" render={(props) => <GameMatcher {...props} />} />
                    <Route path="/game/name:" render={(props) => <GameMatcher {...props} />} />
                </Switch>
            </div>
        {/* </HashRouter> */}
        </BrowserRouter>
    );
}

export default webRouter;