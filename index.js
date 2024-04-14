// const ModuleO0 = require("./func/findPrimesO0");
// const ModuleO1 = require("./func/findPrimesO1");

function handleFindPrimes() {
    const wasmTimeElement = document.getElementById('Time-C');
    const jsTimeElement = document.getElementById('Time-JS');
    const wasmInput = document.getElementById('arrayInput').value;
    const wasmResult = document.getElementById('Result-C');
    const JSinput = document.getElementById('arrayInput').value;
    const JSresult = document.getElementById('Result-JS');

    const startTime = performance.now();
    handleWasmCode(wasmInput, wasmResult);
    const wasmTime = performance.now() - startTime;
    console.log(`Wasm Time: ${wasmTime} milliseconds`);
    wasmTimeElement.textContent = `Wasm Time: ${wasmTime} milliseconds`;

    const startTimeJS = performance.now();
    handleJSCode(JSinput, JSresult);
    const jsTime = performance.now() - startTimeJS;
    console.log(`JS Time: ${jsTime} milliseconds`);
    jsTimeElement.textContent = `JS Time: ${jsTime} milliseconds`;
}

function handleWasmCode(input, result) {

    result.textContent = "Result [wasm]: ";
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
    /* ModuleO0().then((Module) => {
        const numFactorsPointer = Module._malloc(4);
        const factors = Module._findPrimesC(parsedInput, numFactorsPointer);
        const numFactors = Module.HEAP32[numFactorsPointer / 4];
        console.log("number of factors", numFactors);
        let factor;
        for (let i = 0; i < numFactors; i++) {
            factor = Module.HEAP32[factors / 4 + i];
            result.textContent += `${factor}, `;
        }
    }); */
    
}

function handleJSCode(input, result) {
    result.textContent = "Result [js]: ";
    const parsedInput = parseInt(input);


    const factors = findPrimesJS(parsedInput);
    const numFactors = factors.length;
    for (let i = 0; i < numFactors; i++) {
        result.textContent += `${factors[i]}, `;
    }
}

function generateNumbers() {
    var numInput = document.getElementById("num");
    var container = document.getElementById("randomNumbersContainer");
    
    var num = parseInt(numInput.value);
    if (isNaN(num) || num <= 0) {
        alert("Please enter a valid positive number.");
        return;
    }
    
    container.innerHTML = "";
    
    for (var i = 0; i < num; i++) {
        var randomNumber = Math.floor(Math.random() * 1000) + 1;
        
        var input = document.createElement("input");
        input.type = "number";
        input.value = randomNumber;
        input.addEventListener("input", function() {
            this.value = parseInt(this.value);
        });
        
        var pElement = document.createElement("p");
        
        container.appendChild(input);
        container.appendChild(pElement);
        container.appendChild(document.createElement("br"));
    }
}

function calculatePrimeFactors() {
    var inputs = document.querySelectorAll("#randomNumbersContainer input");
    var pElements = document.querySelectorAll("#randomNumbersContainer p");
    var executionTimes = document.getElementById("executionTime");
    
    var startTime = performance.now();
    for (var i = 0; i < inputs.length; i++) {
        var inputNumber = inputs[i].value;
        var pElement = pElements[i];
        handleJSCode(inputNumber, pElement);
    }
    var endTime = performance.now();
    var executionTime = endTime - startTime;
    executionTimes.textContent = "Total Execution Time for [JS]: " + executionTime.toFixed(2) + " ms";
    
    startTime = performance.now();
    for (var i = 0; i < inputs.length; i++) {
        var inputNumber = inputs[i].value;
        var pElement = pElements[i];
        handleWasmCode(inputNumber, pElement);
    }
    endTime = performance.now();
    executionTime = endTime - startTime;
    executionTimes.innerHTML += "<br>Total Execution Time for [wasm]: " + executionTime.toFixed(2) + " ms";
}