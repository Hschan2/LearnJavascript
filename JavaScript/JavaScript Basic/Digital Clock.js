/**
 * 디지털 시계 만들기
 * 조건: bind, apply, call을 사용할 것
 */

// 시계 객체 생성
const clock = {
    currentTime: null, // 최근 시간 초기화
    start() { // 시계 작동
      this.currentTime = new Date(); // 현재 시간 가져오기
      this.displayTime(); // 시간 디지털 형식으로 변환
      setInterval(this.displayTime.bind(this), 1000); // 변환된 시간을 출력하는 함수를 바인드해서 1초마다 업데이트
    },
    displayTime() {
      console.log(this.currentTime.toLocaleTimeString());
    }
};

// `call`을 사용하여 시계 시작
clock.start.call(clock);
