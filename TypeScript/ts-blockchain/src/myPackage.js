// @ts-check, 자바스크립트에서 타입스크립트의 보호 기능을 사용하겠다.
/**
 * 프로젝트(init) 초기화
 * @param {object} config // object 타입으로 config를 선언
 * @param {boolean} config.debug // config의 debug를 boolean 타입으로
 * @param {string} config.url // config의 url을 string 타입으로
 * @returns boolean // 반환 값을 빈 값으로
 * @returns 
 */

export function init(config) {
    return true;
}

/**
 * exit 초기화
 * @param {number} code 
 * @returns number
 */

export function exit(code) {
    return code + 1;
}