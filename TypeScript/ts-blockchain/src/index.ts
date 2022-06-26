/**
들어가기 전

class Block {
    constructor(
        private data: string
    ) {}

    static hello() {
        return "hi";
    }

}

import { init, exit } from "myPackage";

init({
    url: "링크"
})

exit(1)

localStorage.clear()
*/

import crypto from "crypto";

interface BlockShape {
    hash: string;
    prevHash: string;
    height: number;
    data: string;
}

class Block implements BlockShape {
    public hash: string; // 생성할 해시 변수

    constructor(
        public prevHash: string, // 해시에 사용할 이전 해시 값
        public height: number, // 높이 값
        public data: string, // 데이터 값
    ) {
        this.hash = Block.calculatedHash(prevHash, height, data) // 해시 변수에 값 저장
    }

    static calculatedHash(prevHash: string, height: number, data: string) {
        const toHash = `${prevHash}${height}${data}`;
        
        return crypto.createHash("sha256").update(toHash).digest("hex");
    }
}

class Blcokchain {
    private blocks: Block[];

    constructor(
        
    ) {
        this.blocks = [];
    }

    private getPrevHash() {
        if (this.blocks.length === 0) return "";

        return this.blocks[this.blocks.length - 1].hash;
    }

    public addBlock(data: string) {
        const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data);

        this.blocks.push(newBlock);
    }

    public getBlocks() {
        // return this.blocks; // 그대로 내보내는 것은 해킹에 위험
        return [...this.blocks]; // 새로운 배열에 복사해서 데이터가 가진 새로운 배열을 반환
    }
}

const blockchain = new Blcokchain();

blockchain.addBlock("First one");
blockchain.addBlock("Second one");
blockchain.addBlock("Third one");

console.log(blockchain.getBlocks());