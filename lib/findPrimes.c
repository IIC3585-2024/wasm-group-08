// Codigo tomado de geeksforgeeks.org
// https://www.geeksforgeeks.org/print-all-prime-factors-of-a-given-number/

// C Program to print all prime factors
#include <stdio.h>
#include <stdlib.h>

// A function to print all prime factors of a given number n
int primeFactors(int n)
{
	printf("[C] Corriendo codigo C\n");

	// Print the number of 2s that divide n
	while (n%2 == 0)
	{
		printf("[C] %d ", 2);
		n = n/2;
	}

	// n must be odd at this point. So we can skip 
	// one element (Note i = i +2)
	for (int i = 3; i*i <= n; i = i+2)
	{
		// While i divides n, print i and divide n
		while (n%i == 0)
		{
			printf("[C] %d ", i);
			n = n/i;
		}
	}

	// This condition is to handle the case when n 
	// is a prime number greater than 2
	if (n > 2)
		printf ("[C] %d ", n);

	return n;
}



// This is code is improved by Susobhan Akhuli
