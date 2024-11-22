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
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
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
