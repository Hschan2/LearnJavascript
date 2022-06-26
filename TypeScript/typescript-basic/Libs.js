// const userName = 'Maximilian';
// userName = 5;
// Watch -> tsc -w // 저장할 때마다 자동으로
console.log('Sending data..');
// include and exclude files
// 타입스크립트 Libs
var button = document.querySelector('button');
if (button) {
    button.addEventListener('click', function () {
        console.log('Clicked');
    });
}
