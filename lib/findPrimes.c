// Codigo tomado de geeksforgeeks.org
// https://www.geeksforgeeks.org/print-all-prime-factors-of-a-given-number/

// C Program to print all prime factors
#include <stdio.h>
#include <stdlib.h>



// Function to find prime factors of an integer and store them in an array
int* findPrimesC(int n, int *numFactors) {
    int capacity = 10; // Initial capacity of the factors array
    int *factors = (int *)malloc(sizeof(int) * capacity);
    if (factors == NULL) {
        printf("Memory allocation failed!");
        exit(1);
    }

    int index = 0;
    // Print the number of 2s that divide n
    while (n % 2 == 0) {
        factors[index++] = 2;
		printf("Factor: %d ", 2);
        if (index >= capacity) {
            capacity *= 2; // Double the capacity
            factors = (int *)realloc(factors, sizeof(int) * capacity);
            if (factors == NULL) {
                printf("Memory reallocation failed!");
                exit(1);
            }
        }
        n = n / 2;
    }

    // n must be odd at this point. So a skip of 2 (i = i + 2) can be used
    for (int i = 3; i * i <= n; i = i + 2) {
        // While i divides n, store i and divide n
        while (n % i == 0) {
            factors[index++] = i;
			printf("Factor: %d ", i);
            if (index >= capacity) {
                capacity *= 2; // Double the capacity
                factors = (int *)realloc(factors, sizeof(int) * capacity);
                if (factors == NULL) {
                    printf("Memory reallocation failed!");
                    exit(1);
                }
            }
            n = n / i;
        }
    }

    // This condition is to handle the case when n is a prime number greater than 2
    if (n > 2) {
        factors[index++] = n;
		printf("Factor: %d ", n);
        if (index >= capacity) {
            capacity *= 2; // Double the capacity
            factors = (int *)realloc(factors, sizeof(int) * capacity);
            if (factors == NULL) {
                printf("Memory reallocation failed!");
                exit(1);
            }
        }
    }

    // Set the number of factors
    *numFactors = index;
	printf("Number of factors: %d, %d\n", index, *numFactors);

    // Trim the array to its actual size
    factors = (int *)realloc(factors, sizeof(int) * index);

    return factors;
}


// This is code is improved by Susobhan Akhuli
