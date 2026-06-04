import { BAD_WORDS } from "../constants";

/**
 * 정규식 특수 문자를 이스케이프 처리하는 함수
 */
const escapeRegExp = (text: string) => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

// 오탐 방지를 위한 화이트리스트 (예외 단어)
const WHITE_LIST = ["시발점", "변신", "색기", "충분", "충실", "충격"];

/**
 * 비속어 필터링을 위한 통합 정규식 생성 (성능 및 정확도 최적화)
 */
const createBadWordsRegExp = () => {
  const patterns = BAD_WORDS.map((word) => {
    const escaped = escapeRegExp(word);

    // 영어 단어인 경우 단어 경계(\b)를 적용하여 의도성 Problem 방지 (예: 'asset' 내 'ass' 필터링 방지)
    if (/^[a-z]+$/i.test(word)) {
      return `(\\b${escaped}\\b)`;
    }

    // 각 글자 사이에 공백이나 특수문자가 올 수 있도록 패턴 강화 (예: '시!발', '시  발')
    const obfuscatedPattern = escaped.split("").join("[\\s\\W]*");
    return `(${obfuscatedPattern})`;
  });

  return new RegExp(patterns.join("|"), "gi");
};

const cachedBadWordsRegExp = createBadWordsRegExp();

/**
 * 텍스트에 비속어가 포함되어 있는지 확인하는 함수
 */
export const checkBadWords = (text: string): boolean => {
  if (!text) return false;

  // 화이트리스트 단어는 먼저 임시 치환하여 검사에서 제외
  let tempText = text;
  WHITE_LIST.forEach((whiteWord, index) => {
    tempText = tempText.replace(
      new RegExp(whiteWord, "g"),
      `__WHITE${index}__`
    );
  });

  return tempText.search(cachedBadWordsRegExp) !== -1;
};

/**
 * 텍스트 내의 비속어를 '**'로 치환하는 함수
 */
export const filterBadWords = (text: string): string => {
  if (!text) return text;

  // 화이트리스트 단어를 안전하게 보호
  const protectedWords: string[] = [];
  let tempText = text;
  WHITE_LIST.forEach((whiteWord, index) => {
    const placeholder = `__WHITE${index}__`;
    if (tempText.includes(whiteWord)) {
      protectedWords[index] = whiteWord;
      tempText = tempText.replace(new RegExp(whiteWord, "g"), placeholder);
    }
  });

  // 비속어 치환
  let filteredText = tempText.replace(cachedBadWordsRegExp, "**");

  // 보호했던 화이트리스트 단어 복구
  WHITE_LIST.forEach((_, index) => {
    const placeholder = `__WHITE${index}__`;
    if (protectedWords[index]) {
      filteredText = filteredText.replace(
        new RegExp(placeholder, "g"),
        protectedWords[index]
      );
    }
  });

  return filteredText;
};
