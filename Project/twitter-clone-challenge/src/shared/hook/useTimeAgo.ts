export const TimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}초 전`;
  } else if (diffInSeconds < 3600) {
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    return `${diffInMinutes}분 전`;
  } else if (diffInSeconds < 86400) {
    const diffInHours = Math.floor(diffInSeconds / 3600);
    return `${diffInHours}시간 전`;
  } else if (diffInSeconds < 604800) {
    const diffInDays = Math.floor(diffInSeconds / 86400);
    return `${diffInDays}일 전`;
  } else if (diffInSeconds < 2592000) {
    const diffInWeeks = Math.floor(diffInSeconds / 604800);
    return `${diffInWeeks}주 전`;
  } else if (diffInSeconds < 31536000) {
    const diffInMonths = Math.floor(diffInSeconds / 2592000);
    return `${diffInMonths}개월 전`;
  } else {
    const diffInYears = Math.floor(diffInSeconds / 31536000);
    return `${diffInYears}년 전`;
  }
};
