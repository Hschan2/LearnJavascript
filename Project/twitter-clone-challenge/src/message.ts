export const API_ERROR_MESSAGE = Object.freeze({
  NOT_TOKEN_NEW_PASSWORD: "토큰과 새 비밀번호가 필요합니다.",
  EXPIRED_TOKEN: "토큰이 유효하지 않거나 만료되었습니다",
  NOT_HAVE_EMAIL: "이메일이 필요합니다.",
  ALREADY_SIGNED_EMAIL: "이미 가입된 이메일입니다.",
  ALREADY_SIGNED_NAME: "이미 등록된 이름입니다.",
  FAILED_CODE_EMAIL: "인증 코드 발송 실패",
  FAILED_VERIFY: "인증 실패",
  NO_EMAIL_PASSWORD_TOKEN: "이름, 비밀번호, 토큰이 필요합니다.",
  FALSE_TOKEN: "잘못된 토큰입니다.",
  FAILED_SIGN: "회원가입 실패",
  NEED_EMAIL_CODE: "이메일과 코드가 필요합니다.",
  NOT_CODE: "코드가 없습니다.",
  EXPIRED_CODE: "코드가 만료되었습니다.",
  FALSE_CODE: "코드가 틀립니다.",
  FAILED_CODE_CHECK: "코드 검증 실패",
});

export const API_SUCCESS_MESSAGE = Object.freeze({
  INIT_KAKAO_SDK: "✅ Kakao SDK initialized!",
});

export const SERVICE_ERROR_MESSAGE = Object.freeze({
  FAILED_OOBCODE: "유효하지 않은 요청입니다.",
  DIFFERENT_PASSWORD: "비밀번호가 일치하지 않습니다.",
  UNDEFINED_ERROR: "알 수 없는 에러가 발생했습니다.",
  FAILED_SEND_CODE: "코드 발송 실패",
  FAILED_VERIFY_CODE: "코드 검증 실패",
  NOT_VERIFY_ACTION_CODE: "유효하지 않은 액션 코드입니다.",
  FAILED_LOGOUT: "로그아웃 할 수 없습니다.",
  NONE_DELETED_USER: "삭제할 계정이 없습니다.",
  NONE_USER_ID: "유저 아이디가 없습니다.",
  NOT_FIND_USER: "해당 유저 정보를 찾을 수 없습니다.",
  FAILED_DELETE_USER: (error_message: string) =>
    `계정 삭제 실패: ${error_message}`,
  WRONG_PATH: "접근할 수 없는 경로입니다.",
  FAILED_URL_COPY: "URL 복사 실패",
});

export const SERVICE_SUCCESS_MESSAGE = Object.freeze({
  CHANGE_PASSWORD:
    "비밀번호가 성공적으로 변경되었습니다. 3초 후 로그인 페이지로 이동합니다.",
  SEND_PASSWORD_RESET_LINK:
    "입력하신 이메일로 비밀번호 재설정 링크가 발송되었습니다. 이메일을 확인해주세요.",
  RESET_PASSWORD: "비밀번호가 성공적으로 재설정되었습니다.",
  DELETE_ALARM: "알람 삭제 성공",
});

export const SERVICE_MESSAGE = Object.freeze({
  FOLLOW_NOTIFICATION: (senderName: string) =>
    `${senderName}님이 팔로우하였습니다.`,
  LIKE_NOTIFICATION: (senderName: string, tweetTitle: string) =>
    `${senderName}님이 ${tweetTitle}에 좋아요를 눌렀습니다.`,
  COMMENT_NOTIFICATION: (senderName: string, tweetTitle: string) =>
    `${senderName}님이 ${tweetTitle}에 댓글을 작성했습니다.`,
  NEW_NOTIFICATION: "새로운 알림이 있습니다.",
  INPUT_SEARCHING_WORD: "검색어를 입력하세요.",
  CHECK_LOGOUT: "로그아웃을 하시겠습니까?",
  CHECK_DELETE_USER: "계정을 삭제하시겠습니까?",
  CHECK_DELETE_TWEET: "정말로 삭제하시겠습니까?",
  SUCCESS_URL_COPY: "URL 복사가 완료되었습니다.",
});

export const AUTH_SERVICE_ERROR_MESSAGE = Object.freeze({
  USER_NOT_FOUNT: "해당 이메일로 등록된 계정이 없습니다.",
  WRONG_PASSWORD: "비밀번호가 잘못되었습니다.",
  INVALID_EMAIL: "유효하지 않은 이메일 형식입니다.",
  INVALID_LOGIN_CREDENTIALS: "이메일 또는 비밀번호가 올바르지 않습니다.",
  ALREADY_USE_EMAIL: "이미 사용 중인 이메일입니다.",
  NETWORK_REQUEST_FAILED:
    "네트워크 오류가 발생했습니다. 인터넷 연결을 확인하세요.",
  INVALID_ACTION_CODE: "유효하지 않은 요청입니다. 다시 시도해주세요.",
  EXPIRED_ACTION_CODE: "요청이 만료되었습니다. 다시 시도해주세요.",
  USER_DISABLED: "사용이 중지된 계정입니다.",
  WEAK_PASSWORD: "비밀번호는 6자리 이상이어야 합니다.",
  FAILED_AUTH: "인증에 실패했습니다. 다시 시도해주세요.",
});

export const AUTH_MESSAGE = Object.freeze({
  INPUT_EMAIL: "이메일을 입력해 주세요.",
  INPUT_VERIFY_CODE: "인증 코드를 입력해 주세요.",
  SEND_VERIFY_CODE: "인증 코드가 이메일로 발송되었습니다.",
  SUCCESS_VERIFY_EMAIL: "이메일 인증이 완료되었습니다.",
  NEEDED_VERIFY_EMAIL: "이메일 인증이 필요합니다.",
});

export const DATA_ERROR_MESSAGE = Object.freeze({
  NOT_DATE_DATA: "날짜 없음",
});

export const FOOTER_MESSAGE = "ⓒYooP. ALL RIGHTS RESERVED BY 홍성찬";
export const LOADING_MESSAGE = "Loading...";
