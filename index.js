
function handleFindPrimes() {
    handleWasmCode();
    handleJSCode();
}

function handleWasmCode() {
    const input = document.getElementById('arrayInput').value;
    const result = document.getElementById('Result-C');
    result.textContent = "Result: ";
    const parsedInput = parseInt(input);

    console.log(`[JS] Numero a calcular: ${parsedInput}`);

    const numFactorsPointer = Module._malloc(4);
    const factors = Module._findPrimesC(parsedInput, numFactorsPointer);
    const numFactors = Module.HEAP32[numFactorsPointer / 4];
    console.log("number of factors", numFactors);
    let factor;
    for (let i = 0; i < numFactors; i++) {
        factor = Module.HEAP32[factors / 4 + i];
        result.textContent += `${factor}, `;
    }
}

function handleJSCode() {
    const input = document.getElementById('arrayInput').value;
    const result = document.getElementById('Result-JS');
    result.textContent = "Result: ";
    const parsedInput = parseInt(input);


    const factors = findPrimesJS(parsedInput);
    const numFactors = factors.length;
    for (let i = 0; i < numFactors; i++) {
        result.textContent += `${factors[i]}, `;
    }
}