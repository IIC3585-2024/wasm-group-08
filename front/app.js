
let globalTiempoJavaScript = 0;
let globalTiempoWebAssembly = 0;

document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("iniciarCarrera").addEventListener("click", () => {
    const numero = document.getElementById("numero").value;
    if (numero) {
      iniciarCarrera(numero);
    } else {
      mostrarResultado("Por favor, ingresa un número válido.");
    }
  });
  
  document.getElementById("resetearCarrera").addEventListener("click", () => {
    resetearCarrera();
  });
  document.getElementById("verCarrera").addEventListener("click", () => {
    iniciarCarreraJSvsWasm(globalTiempoJavaScript, globalTiempoWebAssembly);
  });
});

function iniciarCarrera(numero) {
  // Aqui deberia haber una funcion o algo que obtenga los resultados de los algoritmos
  const factoresSimulados = []; // Averiguar como obtener resultado del agloritmo

  const algoritmoJavascript = () => handleJSCode(numero);
  const algoritmoWasm = () => handleWasmCode(numero);
  const [tiempoJs, factorsJS] = correrAlgoritmo(algoritmoJavascript);
  const [tiempoWasm, factorsWasm] = correrAlgoritmo(algoritmoWasm);
  globalTiempoJavaScript = tiempoJs;
  globalTiempoWebAssembly = tiempoWasm;

  const mensajeResultado = `Carrera completada. <br> JavaScript terminó en ${globalTiempoJavaScript}ms. <br> Los factores resultantes son: ${factorsJS} <br> WebAssembly terminó en ${globalTiempoWebAssembly}ms. <br> Los factores resultantes son: ${factorsWasm} <br> ¡Parece que tenemos un ganador!`;

  // Mostramos el resultado y los factores primos.
  mostrarResultado(mensajeResultado, factorsJS);
}

function handleJSCode(input) {
  let result = "";
  const parsedInput = parseInt(input);
  const factors = findPrimesJS(parsedInput);
  const numFactors = factors.length;
  for (let i = 0; i < numFactors; i++) {
      result += `${factors[i]}, `;
  }

  return result;
}

function handleWasmCode(input) {
  const parsedInput = parseInt(input);
  let result = "";
  const numFactorsPointer = Module._malloc(4);

  const optimizationLevel = document.getElementById("optimizationLevel").value;
  const optimizationFunctions = {
    "O0": Module._findPrimesC,
    "O1": Module._findPrimesO1,
    "O2": Module._findPrimesO2,
    "Os": Module._findPrimesOs,
    "Oz": Module._findPrimesOz,
    "Og": Module._findPrimesOg,
    "O3": Module._findPrimesO3
  };
  const factors = optimizationFunctions[optimizationLevel](parsedInput, numFactorsPointer);
  
  const numFactors = Module.HEAP32[numFactorsPointer / 4];
  let factor;
  for (let i = 0; i < numFactors; i++) {
      factor = Module.HEAP32[factors / 4 + i];
      result += `${factor}, `;
  }
  console.log(result);
  return result;
}

function correrAlgoritmo(handlefindprimesFunction) {
  const startTime = performance.now();
  const factors = handlefindprimesFunction();
  const endTime = performance.now() - startTime;
  return [endTime, factors];
}

function mostrarResultado(mensaje, factores) {
  const resultadoDiv = document.getElementById("resultado");
  const factoresTexto = `Los números primos que multiplicados dan este número son: ${factores}.`;
  resultadoDiv.innerHTML = `${mensaje}<br>${factoresTexto}`;
}

function resetearCarrera() {
  const autoJavaScript = document.getElementById("autoJavaScript");
  const autoWebAssembly = document.getElementById("autoWebAssembly");

  autoJavaScript.style.transition = 'none';
  autoWebAssembly.style.transition = 'none';

  autoJavaScript.style.transform = "translateX(0px)";
  autoWebAssembly.style.transform = "translateX(0px)";

  autoJavaScript.offsetHeight;
  autoWebAssembly.offsetHeight;

  autoJavaScript.style.transition = '';
  autoWebAssembly.style.transition = '';
}


function iniciarCarreraJSvsWasm(tiempoJS, tiempoWasm) {
  const tiempoMaximo = Math.max(tiempoJS, tiempoWasm);
  const duracionJS = (tiempoJS / tiempoMaximo) * 10;
  const duracionWasm = (tiempoWasm / tiempoMaximo) * 10;

  const autoJavaScript = document.getElementById("autoJavaScript");
  autoJavaScript.style.transition = `transform ${duracionJS}s linear`;
  autoJavaScript.style.transform = "translateX(600px)";

  const autoWebAssembly = document.getElementById("autoWebAssembly");
  autoWebAssembly.style.transition = `transform ${duracionWasm}s linear`;
  autoWebAssembly.style.transform = "translateX(600px)";
}

