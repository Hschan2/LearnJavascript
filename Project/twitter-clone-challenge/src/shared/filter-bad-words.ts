import { BAD_WORDS } from "../constants";

/**
 * 텍스트에 비속어가 포함되어 있는지 확인하는 함수
 * @param text 검사할 텍스트
 * @returns 비속어 포함 여부 (true: 비속어 포함, false: 비속어 미포함)
 */
export const checkBadWords = (text: string): boolean => {
  const cleanText = text.replace(/\s+/g, "");

  return BAD_WORDS.some((word) => {
    if (text.includes(word)) return true;
    if (cleanText.includes(word)) return true;
    return false;
  });
};

/**
 * 텍스트 내의 비속어를 '**'로 치환하는 함수
 * @param text 필터링할 텍스트
 * @returns 비속어가 치환된 텍스트
 */
export const filterBadWords = (text: string): string => {
  let filteredText = text;

  BAD_WORDS.forEach((word) => {
    // 일반적인 단어 치환 (대소문자 무시)
    const regex = new RegExp(word, "gi");
    filteredText = filteredText.replace(regex, "**");

    // 공백이 포함된 형태도 처리 (예: '시 발' -> '**')
    const spacedPattern = word.split("").join("\\s*");
    const spacedRegex = new RegExp(spacedPattern, "gi");
    filteredText = filteredText.replace(spacedRegex, "**");
  });

  return filteredText;
};
