// 일반적인 자바스크립트 코드를 타입스크립트에게 알려주는 곳

interface Config {
    url: string
}

declare module "myPackage" {
    function init(config: Config): boolean;
    function exit(code: number): number;
}