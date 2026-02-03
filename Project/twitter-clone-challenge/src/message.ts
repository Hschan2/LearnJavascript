export const messages = {
  apiError: {
    notTokenNewPassword: "토큰과 새 비밀번호가 필요합니다.",
    expiredToken: "토큰이 유효하지 않거나 만료되었습니다",
    notHaveEmail: "이메일이 필요합니다.",
    alreadySignedEmail: "이미 가입된 이메일입니다.",
    alreadySignedName: "이미 등록된 이름입니다.",
    failedCodeEmail: "인증 코드 발송 실패",
    failedVerify: "인증 실패",
    noEmailPasswordToken: "이름, 비밀번호, 토큰이 필요합니다.",
    falseToken: "잘못된 토큰입니다.",
    failedSign: "회원가입 실패",
    needEmailCode: "이메일과 코드가 필요합니다.",
    notCode: "코드가 없습니다.",
    expiredCode: "코드가 만료되었습니다.",
    falseCode: "코드가 틀립니다.",
    failedCodeCheck: "코드 검증 실패",
  },
  apiSuccess: {
    initKakaoSdk: "✅ Kakao SDK initialized!",
  },
  serviceError: {
    failedOobcode: "유효하지 않은 요청입니다.",
    differentPassword: "비밀번호가 일치하지 않습니다.",
    undefinedError: "알 수 없는 에러가 발생했습니다.",
    failedSendCode: "코드 발송 실패",
    failedVerifyCode: "코드 검증 실패",
    notVerifyActionCode: "유효하지 않은 액션 코드입니다.",
    failedLogout: "로그아웃 할 수 없습니다.",
    noneDeletedUser: "삭제할 계정이 없습니다.",
    noneUserId: "유저 아이디가 없습니다.",
    notFindUser: "해당 유저 정보를 찾을 수 없습니다.",
    failedDeleteUser: "계정 삭제 실패: {errorMessage}",
    wrongPath: "접근할 수 없는 경로입니다.",
    failedUrlCopy: "URL 복사 실패",
  },
  serviceSuccess: {
    changePassword:
      "비밀번호가 성공적으로 변경되었습니다. 3초 후 로그인 페이지로 이동합니다.",
    sendPasswordResetLink:
      "입력하신 이메일로 비밀번호 재설정 링크가 발송되었습니다. 이메일을 확인해주세요.",
    resetPassword: "비밀번호가 성공적으로 재설정되었습니다.",
    deleteAlarm: "알람 삭제 성공",
  },
  serviceMessage: {
    followNotification: "{senderName}님이 팔로우하였습니다.",
    likeNotification: "{senderName}님이 {tweetTitle}에 좋아요를 눌렀습니다.",
    commentNotification: "{senderName}님이 {tweetTitle}에 댓글을 작성했습니다.",
    newNotification: "새로운 알림이 있습니다.",
    inputSearchingWord: "검색어를 입력하세요.",
    checkLogout: "로그아웃을 하시겠습니까?",
    checkDeleteUser: "계정을 삭제하시겠습니까?",
    checkDeleteTweet: "정말로 삭제하시겠습니까?",
    successUrlCopy: "URL 복사가 완료되었습니다.",
  },
  authServiceError: {
    userNotFount: "해당 이메일로 등록된 계정이 없습니다.",
    wrongPassword: "비밀번호가 잘못되었습니다.",
    invalidEmail: "유효하지 않은 이메일 형식입니다.",
    invalidLoginCredentials: "이메일 또는 비밀번호가 올바르지 않습니다.",
    alreadyUseEmail: "이미 사용 중인 이메일입니다.",
    networkRequestFailed: "네트워크 오류가 발생했습니다. 인터넷 연결을 확인하세요.",
    invalidActionCode: "유효하지 않은 요청입니다. 다시 시도해주세요.",
    expiredActionCode: "요청이 만료되었습니다. 다시 시도해주세요.",
    userDisabled: "사용이 중지된 계정입니다.",
    weakPassword: "비밀번호는 6자리 이상이어야 합니다.",
    failedAuth: "인증에 실패했습니다. 다시 시도해주세요.",
  },
  auth: {
    inputEmail: "이메일을 입력해 주세요.",
    inputVerifyCode: "인증 코드를 입력해 주세요.",
    sendVerifyCode: "인증 코드가 이메일로 발송되었습니다.",
    successVerifyEmail: "이메일 인증이 완료되었습니다.",
    neededVerifyEmail: "이메일 인증이 필요합니다.",
  },
  dataError: {
    notDateData: "날짜 없음",
  },
  footer: "ⓒYooP. ALL RIGHTS RESERVED BY 홍성찬",
  loading: "Loading...",
};

export const formatMessage = (
  message: string,
  data: { [key: string]: string }
) => {
  return Object.entries(data).reduce((acc, [key, value]) => {
    return acc.replace(new RegExp(`{${key}}`, "g"), value);
  }, message);
};
