function generateArrayAndPrint() {
    // Get the input value and split it into an array of numbers
    const input = document.getElementById('arrayInput').value;
    const parsedInput = parseInt(input);

    console.log(`[JS] Numero a calcular: ${parsedInput}`);

    // const numbers = input.split(',').map(Number);
    // console.log(`[JS] Array elements: ${numbers}`);

    // // Create a Uint32Array from the numbers
    // const uint32Array = new Uint32Array(numbers);

    // // Allocate memory in the WebAssembly module
    // const pointer = Module._malloc(uint32Array.length * uint32Array.BYTES_PER_ELEMENT);

    // // Set the values from uint32Array into the allocated memory
    // Module.HEAPU32.set(uint32Array, pointer / 4);

    // // Call the sum_array function from the WASM module
    // const sum = Module._sum_array(pointer, uint32Array.length);
    const result = Module._findPrimes();
    console.log(`[JS] Ultimo primo: ${result}`);
    // console.log("-------------------------")

    // // Free the allocated memory
    // Module._free(pointer);

    // // Display the result in the HTML
    // const resultDiv = document.getElementById('printArrayResult');
    // resultDiv.textContent = `Array sum: ${sum}`;
}