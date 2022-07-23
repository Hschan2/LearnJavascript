import React, {PureComponent, memo} from 'react';

// 함수 컴포넌트 (Hook x)
// Hook => useEffect, useState를 사용할 때
// Lotto의 자식 컴포넌트인 Ball은 항상 memo, PureComponent를 해주어야 한다 = 불필요한 렌더링 막기 위해
const Ball = memo(({number}) => {
    let background;

    if(number <= 10) background = 'red';
    if(number <= 20) background = 'orange';
    if(number <= 30) background = 'yellow';
    if(number <= 40) background = 'blue';
    else background = 'green';

    return (
        <div className = "ball" style = {{background}}>{number}</div>
    );
});

// class Ball extends PureComponent {
//     render() {
//         const {number} = this.prop;
//         let background;

//         if(number <= 10) background = 'red';
//         if(number <= 20) background = 'orange';
//         if(number <= 30) background = 'yellow';
//         if(number <= 40) background = 'blue';
//         else background = 'green';

//         return (
//             <div className = "ball" style = {{background}}>{number}</div>
//         );
//     }
// }

export default Ball;