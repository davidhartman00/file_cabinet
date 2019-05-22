/* 
Script Name..: library.js
Date Created.: 05/22/2019
Author.......: David Hartman
Description..: A collection of useful Javascript fuctions and methods
*/

// returns an array of all prime numbers less then the number provided.
// As 1 is not prime per the exact definition for prime, the array does
// not include 1.
const arrayOfPrimes = num => {
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
