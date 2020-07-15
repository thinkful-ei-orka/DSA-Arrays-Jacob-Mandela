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
            throw new Error('Out of memory');
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
    console.log(memory.get(0));
    while (arr.length !== 0) {
        arr.pop();
    }
    console.log('array emptied', arr);
    arr.push('tauhida');
    //it isn't retrieving tauhida, which is probably a result of a memory leak.  
    //the resize function is ensuring that as you add data to the array that you have enough memory allocated for the new entry, and adjusting the capacity if you need more memory.
    console.log(URLIfy('tauhida parveen'));
    let testArray = [1, 5, 22, 3];
    let arr1 = [1,3,6,8,11];
    let arr2 = [2,3,5,8,9,12];
    console.log('filter:  ', filterArray(testArray));
    console.log('sum: ', sumArray(testArray));
    // console.log('combined: ', combineArrays(arr1, arr2));
    let vowels = ['a','e','i','o','u'];
    console.log('remove vowels from "hello":  ', removeCharacters('hello', vowels));
    let productArr = [1, 3, 9, 4];
    console.log('product array: ', Products(productArr));
    console.log('string rotation:  ', StringRotation('amazon', 'azonam'));
    

};

//5.  URLify a string
function URLIfy(string) {
    return string.replace(' ', '%20');
}
//6. Filter an array 

function filterArray(arr) {
    //filters all values in array less than 5
    let filteredArray = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= 5) {
            filteredArray.push(arr[i]);
        }
    }
    return filteredArray;
}
//7. Sum array
function sumArray(arr) {
    let sum = 0;
    arr.forEach(num => sum += num);
    return sum;
}

//8. 

// function combineArrays(a, b) {
//     //is a[i] <= b[j]? yes: push a[i] increment i. no: push b[j] increment j
//     let combinedArray = [];
//     let aIndex = 0;
//     let bIndex = 0;
//     while (aIndex <= a.length || bIndex <= b.length) {
//         if(a[aIndex] > b[bIndex]) {
//             combinedArray.push(b[bIndex]);
//             bIndex++;

//         } else {
//             combinedArray.push(a[aIndex]);
//             aIndex++;
//         }
        
    
//     }
//     return combinedArray;
// }

//9. Remove characters
function removeCharacters(str, chars) {
    let sliceString = '';
    for (let i = 0; i < str.length; i++) {
        if(!chars.includes(str.charAt(i))) {
            sliceString += str.charAt(i);
        }
    }
    return sliceString;
}

//10. Products

function Products(arr) {
    let prodArr = [];
    let tempProduct = 1;
    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr.length; j++) {
            if(arr[j] !== arr[i]) {
                tempProduct *= arr[j];
            }
        }
        prodArr.push(tempProduct);
        tempProduct = 1;
    }
    return prodArr;
}

// 11. 2D array
// Write an algorithm which searches through a 2D array, and whenever it finds a 0 should set the entire row and column to 0.

// Input:
// [[1,0,1,1,0],
// [0,1,1,1,0],
// [1,1,1,1,1],
// [1,0,1,1,1],
// [1,1,1,1,1]];
// Output:
// [[0,0,0,0,0],
// [0,0,0,0,0],
// [0,0,1,1,0],
// [0,0,0,0,0],
// [0,0,1,1,0]];


//12.  String Rotation 
// Given 2 strings, str1 and str2, write a program that checks if str2 is a rotation of str1.
// Input: amazon, azonma
// Output: False  
// Input: amazon, azonam
// Output: true

function StringRotation (str1, str2) {
    let testString = str1 + str1;
    return (str1.length === str2.length && (str1 + str1).includes(str2));
}

main();