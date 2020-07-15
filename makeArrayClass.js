const Memory = require('./memory');
const memory = new Memory() ;
class Array {
    constructor() {
        this.length = 0;
        this.ptr = memory.allocate(this.length);
    }

    resize(size) {
        const oldPtr = this.ptr;
        this.ptr = memory.allocate(size);
        if (this.ptr === null) {
            throw new Error('Out of memor');
        }
        memory.copy(this.ptr, oldPtr, this.length);
        memory.free(oldPtr);
    }

    push(value) {
        this.resize(this.length + 1);
        memory.set(this.ptr + this.length, value);
        this.length++;
    }

    pop() {
        if (this.length === 0) {
            throw new Error('Index Error');
        }
        const value = memory.get(this.ptr + this.length - 1);
        this.length--;
        return value;
    }
}

let main = () => {
    Array.SIZE_RATIO = 3;

    let arr = new Array();

    console.log(arr);
    arr.push(3);
    // console.log(arr);
    arr.push(5);
    // console.log(arr);
    arr.push(15);
    // console.log(arr);
    arr.push(19);
    // console.log(arr);
    arr.push(45);
    arr.push(10);

    console.log(arr);

    arr.pop();
    arr.pop();
    arr.pop();

    console.log('pops complete',arr);
};

main();