/**
 * Date 함수가 아닌 window.performance로 시간 측정
 */

// 시간 측정을 위해 Date.now()를 사용해왔다. 그러나 이는 정확성이 떨어진다.
const startDate = Date.now(); // 시작 시간
const dateTimeTaken = Date.now() - startDate; // 걸린 시간 구하기

// Date.now()보다 더욱 높은 정확성으로 시간 측정을 하기 위해서 아래와 같이 사용한다.
const startPerformance = window.performance.now(); // 시작 시간
const performanceTimeTaken = window.performance.now() - startPerformance; // 걸린 시간 구하기