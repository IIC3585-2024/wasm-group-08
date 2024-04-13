
function handleFindPrimes() {
    const wasmTimeElement = document.getElementById('Time-C');
    const jsTimeElement = document.getElementById('Time-JS');
    const startTime = performance.now();
    handleWasmCode();
    const wasmTime = performance.now() - startTime;
    console.log(`Wasm Time: ${wasmTime} milliseconds`);
    wasmTimeElement.textContent = `Wasm Time: ${wasmTime} milliseconds`;

    const startTimeJS = performance.now();
    handleJSCode();
    const jsTime = performance.now() - startTimeJS;
    console.log(`JS Time: ${jsTime} milliseconds`);
    jsTimeElement.textContent = `JS Time: ${jsTime} milliseconds`;
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