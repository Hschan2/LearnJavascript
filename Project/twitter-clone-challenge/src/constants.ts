// 회원가입 및 로그인 시, 이메일과 패스워드 정규식표현 (Valid)
export const validationRules = {
  name: {
    required: "이름을 입력해 주세요.",
    pattern: {
      value: /^[가-힣a-zA-Z-_]+$/,
      message: "이름은 한글, 영어, -, _만 사용할 수 있습니다.",
    },
  },
  email: {
    required: "이메일을 입력해 주세요.",
    pattern: {
      value:
        /^[a-zA-Z0-9._%+-]+@(gmail\.com|naver\.com|daum\.net|hanmail\.net|outlook\.com|nate\.com)$/,
      message: "이메일 양식에 맞게 입력해 주세요.",
    },
  },
  password: {
    required: "비밀번호를 입력해 주세요.",
    pattern: {
      value: /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/,
      message: "비밀번호 양식에 맞게 입력해 주세요.",
    },
    minLength: {
      value: 8,
      message: "비밀번호는 8글자 이상 입력해 주세요.",
    },
  },
};

// Tweet 내 촬영 기기 선택 메뉴
export const SELECT_OPTION_VALUE = [
  "아이폰",
  "갤럭시",
  "소니",
  "캐논",
  "니콘",
  "후지",
  "라이카",
  "기타",
];

// 이미지 크기 제한
export const MAX_IMAGE_FILE_SIZE = 2 * 1024 * 1024;

// 비속어 리스트
export const BAD_WORDS = [
  // 한국어 정석 비속어 및 변형
  "시발", "씨발", "ㅆㅂ", "ㅅㅂ", "시벌", "시부레", "시부랄", "시바", "씨바", "찌발", "시빨", "씨빨",
  "개새끼", "개새", "ㄱㅅㄲ", "ㄲㅅㄲ", "개세끼", "개쉐이", "개쉐", "개스키",
  "병신", "ㅂㅅ", "ㅄ", "빙신", "뵹신",
  "미친", "ㅁㅊ", "미친놈", "미친년", "미친색기", "미친새끼",
  "존나", "좆", "좃", "ㅈㄴ", "조까", "좆까", "족까", "좃까",
  "엠창", "엄창", "니미", "느금", "느검", "니기미", "씹", "씼",
  "지랄", "ㅈㄹ", "지럴", "염병", "옘병",
  "닥쳐", "ㄷㅊ", "아가리", "닥치세요",
  
  // 영어 비속어 및 변형
  "fuck", "fck", "f*ck", "f u c k", "fxxk", "shit", "sh*t", "bitch", "btch",
  "asshole", "bastard", "dick", "pussy", "suck", "motherfucker", "fucking",
  
  // 인터넷 비속어 및 혐오 표현
  "한남", "김치녀", "메갈", "일베", "충", "개독", "ㅗ", "ㅗㅗ", "凸"
];

// 프로필 기본 이미지
export const INITIAL_IMAGE =
      "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbxwsqs%2FbtsK1ACfsyI%2FyojjVvJwKpX4bdZ0CtZkJ0%2Fimg.png";
