// 회원가입 및 로그인 시, 이메일과 패스워드 정규식표현
export const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

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
