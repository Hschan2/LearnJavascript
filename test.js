let str = 'abcabd';

str = str.replace(str.charAt(0), 'c');

let result = str.charAt(0) + str.charAt(str.length - 1);

console.log(result);