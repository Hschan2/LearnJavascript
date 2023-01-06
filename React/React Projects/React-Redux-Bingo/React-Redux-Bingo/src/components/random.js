const random = () => {
    const r_number = [];

    for(let add=1; add<=25; add++) {
        r_number[add] = Math.floor(Math.random() * 25) + 1;

        for(let overlap=1; overlap<=25; overlap++) {
            if(r_number[add] === r_number[overlap]){
                add--;
                break;
            }
        }
    }
    return r_number;
}

const cellArray = (array) => {

}

export {random};
export {cellArray};