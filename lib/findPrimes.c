// Codigo tomado de geeksforgeeks.org
// https://www.geeksforgeeks.org/print-all-prime-factors-of-a-given-number/

// C Program to print all prime factors
#include <stdio.h>
#include <stdlib.h>

// Function to find prime factors of an integer and store them in an array
unsigned long int * findPrimesC(unsigned long int  n, int *numFactors) {
    int capacity = 100; // Initial capacity of the factors array
    unsigned long int  *factors = (unsigned long int  *)malloc(sizeof(unsigned long int ) * capacity);

    int index = 0;
    // Save the number of 2s that divide n
    while (n % 2 == 0) {
        factors[index++] = 2;
        n = n / 2;
    }

    // n must be odd at this point.
    // So we can skip one element
    // (Note i = i +2)
    for (unsigned long int  i = 3; i * i <= n; i = i + 2) {
        // While i divides n, store i and divide n
        while (n % i == 0) {
            factors[index++] = i;
            n = n / i;
        }
    }

    // This condition is to handle the
    // case when n is a prime number
    // greater than 2
    if (n > 2) {
        factors[index++] = n;
    }

    // Set the number of factors
    *numFactors = index;

    // Trim the array to its actual size
    factors = (unsigned long int  *)realloc(factors, sizeof(unsigned long int ) * index);

    return factors;
}


// This is code is improved by Susobhan Akhuli
