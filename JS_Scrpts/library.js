/* 
Script Name..: library.js
Date Created.: 05/22/2019
Author.......: David Hartman
Description..: A collection of useful Javascript fuctions and methods
*/

// returns an array of all prime numbers less then the number provided.
// As 1 is not prime per the exact definition for prime, the array does
// not include 1.
const arrPrimes = num => {
    let arr = [], i = 2

    while (i <= num) {
        let a = 2, flag = true;
        if (i > 2) {
            while (a < i) {
                if (i % a === 0) {
                    flag = false
                    break
                }
                a++
            }
        }
        if (flag) arr.push(i)
        i++
    }
    return arr
}


// returns an array of all numbers in the Fibonacci 
// sequence less then the number provided.
const arrFibonacci = num => {
    let a = 1, b = 0, arr = [1], i = 0
    while (i < num) {
        let x = a + b
        arr.push(x)
        b = a
        a = x
        i++
    }
    return arr
}

// returns a flat array given an array of unknow depth.
// Use: pass an array of unknow depth to receive a flat 
// array in return
const arrFlatten = arr => {
    return arr.flatMap(el => {
        const flatten = val => {
            return !Array.isArray(val) ? val :
                val.flatMap(v => flatten(v))
        }
        return flatten(el)
    })
}