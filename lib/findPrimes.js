// Codigo tomado de geeksforgeeks.org
// https://www.geeksforgeeks.org/print-all-prime-factors-of-a-given-number/

function findPrimesJS(n) {

    let factors = [];

    // Save the number of 2s that divide n
    while (n % 2 == 0) {
        factors.push(2);
        n = Math.floor(n / 2);
    }

    // n must be odd at this point.
    // So we can skip one element
    // (Note i = i +2)
    for (let i = 3; i * i <= n; i = i + 2) {
        // While i divides n, push i and divide n
        while (n % i == 0) {
            factors.push(i);
            n = Math.floor(n / i);
        }
    }

    // This condition is to handle the
    // case when n is a prime number
    // greater than 2
    if (n > 2)
        factors.push(n);

    return factors;
}
