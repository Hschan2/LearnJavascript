/**
 * 이미지 최적화
 * Webp, ImageKit, Srcset
 */

const image = document.getElementById("image");

// 이미지 최적화 전 사용
// 이미지 크기, 168KB를 그대로 가져와서 사용하게 된다.
image.src = './exampleImages/moonbucks.png';

// 방법 1. https://tinypng.com/ 사이트에서 이미지 크기 줄이기

// 방법 2. https://imagekit.io/ 활용하기
// https://imagekit.io/ 대시보드에서 라이브러리 메뉴에 활용하고자 하는 이미지를 업로드하고 난 후 사용
// JPG, PNG 파일을 Webp 파일로 반환해준다.
image.src = 'https://imagekit.io/your_name/moonbucks.png';

// 가로 600, 세로 600 크기의 이미지로 반환할 수 있다. 해당 사이즈를 라이브러리에 저장해 (캐싱) 이 후 빠르게 요청, 반환이 가능하다.
// 크기가 줄어듬에 따라 이미지 크기도 줄어들며, 품질도 보장해준다.
image.src = 'https://imagekit.io/your_name/tr:w-600,h-600/moonbucks.png';

// Srcset
// 원하는 이미지 크기들을 지정해서 저장할 수 있다. 브라우저 크기에 따라 600, 800, 1200으로 이미지가 반환이 된다.
// image.src가 기본이며, srcset은 백업 용도로 활용된다.
image.srcset = `https://imagekit.io/your_name/tr:w-600,h-600/moonbucks.png 400w,
                        https://imagekit.io/your_name/tr:w-800,h-600/moonbucks.png 800w,
                        https://imagekit.io/your_name/tr:w-1200,h-600/moonbucks.png 1200w`;

