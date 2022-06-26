// const userName = 'Maximilian';
// userName = 5;

// Watch -> tsc -w // 저장할 때마다 자동으로
console.log('Sending data..');

// include and exclude files

// 타입스크립트 Libs
const button = document.querySelector('button')!;

function clickHandler(message: string) {
    console.log('Clicked! ' + message);
}
if(button) {
    button.addEventListener('click', clickHandler.bind(null, "Hello")); // strictBindCallApply(tsconfig.json - strictBindCallApply = true)
}
