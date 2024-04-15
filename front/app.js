let globalTiempoJavaScript = 0;
let globalTiempoWebAssembly = 0;

let module;

const optimizationModules = {
  O0: () => window.ModuleO0({ noInitialRun: true }),
  O1: () => window.ModuleO1({ noInitialRun: true }),
  O2: () => window.ModuleO2({ noInitialRun: true }),
  Os: () => window.ModuleOs({ noInitialRun: true }),
  Oz: () => window.ModuleOz({ noInitialRun: true }),
  Og: () => window.ModuleOg({ noInitialRun: true }),
  O3: () => window.ModuleO3({ noInitialRun: true }),
};

async function updateModule() {
  const optimizationLevel = document.getElementById("optimizationLevel").value;
  module = await optimizationModules[optimizationLevel]();
}

updateModule();

document
  .getElementById("optimizationLevel")
  .addEventListener("change", function () {
    updateModule();
  });

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
  const algoritmoJavascript = () => handleJSCode(numero);
  const algoritmoWasm = () => handleWasmCode(numero);
  const [tiempoJs, factorsJS] = correrAlgoritmo(algoritmoJavascript);
  const [tiempoWasm, factorsWasm] = correrAlgoritmo(algoritmoWasm);
  globalTiempoJavaScript = tiempoJs;
  globalTiempoWebAssembly = tiempoWasm;

  const resultado = {
    factorsJS,
    tiempoJs,
    factorsWasm,
    tiempoWasm,
  };

  mostrarResultado(resultado);
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

  const numFactorsPointer = module._malloc(4);
  const factors = module._findPrimesC(parsedInput, numFactorsPointer);

  const numFactors = module.HEAP32[numFactorsPointer / 4];
  let factor;
  for (let i = 0; i < numFactors; i++) {
    factor = module.HEAP32[factors / 4 + i];
    result += `${factor}, `;
  }
  return result;
}

function correrAlgoritmo(handlefindprimesFunction) {
  const repeticiones = document.getElementById("repeticiones").value || 30;
  let tiempoTotal = 0;
  let factors;
  for (let i = 0; i < repeticiones; i++) {
    const startTime = performance.now();
    factors = handlefindprimesFunction();
    const endTime = performance.now() - startTime;
    tiempoTotal += endTime;
  }
  return [tiempoTotal / repeticiones, factors];
}

function mostrarResultado(resultado) {
  const factoresJS = resultado.factorsJS;
  const tiempoJS = resultado.tiempoJs;
  const factoresWasm = resultado.factorsWasm;
  const tiempoWasm = resultado.tiempoWasm;

  const finCarreraDiv = document.getElementById("finCarrera");
  const resultadoFactoresJSDiv = document.getElementById("resultadoFactoresJS");
  const resultadoTiempoJSDiv = document.getElementById("resultadoTiempoJS");
  const resultadoFactoresWasmDiv = document.getElementById(
    "resultadoFactoresWasm"
  );
  const resultadoTiempoWasmDiv = document.getElementById("resultadoTiempoWasm");

  const mensajeFinCarrera = `Carrera completada. ¡Parece que tenemos un ganador!`;
  const mensajeFactoresJS = `Los factores primos para JS son: ${factoresJS}`;
  const mensajeTiempoJS = `Javascript tuvo un tiempo promedio de ${tiempoJS}ms. `;
  const mensajeFactoresWasm = `Los factores primos para Wasm son: ${factoresWasm}`;
  const mensajeTiempoWasm = `WebAssembly tuvo un tiempo promedio de ${tiempoWasm}ms. `;

  finCarreraDiv.innerHTML = mensajeFinCarrera;
  resultadoFactoresJSDiv.innerHTML = mensajeFactoresJS;
  resultadoTiempoJSDiv.innerHTML = mensajeTiempoJS;
  resultadoFactoresWasmDiv.innerHTML = mensajeFactoresWasm;
  resultadoTiempoWasmDiv.innerHTML = mensajeTiempoWasm;
}

function resetearCarrera() {
  const autoJavaScript = document.getElementById("autoJavaScript");
  const autoWebAssembly = document.getElementById("autoWebAssembly");

  autoJavaScript.style.transition = "none";
  autoWebAssembly.style.transition = "none";

  autoJavaScript.style.transform = "scaleX(-1) translateX(0px)";
  autoWebAssembly.style.transform = "scaleX(-1) translateX(0px)";

  autoJavaScript.offsetHeight;
  autoWebAssembly.offsetHeight;

  autoJavaScript.style.transition = "";
  autoWebAssembly.style.transition = "";
}

function iniciarCarreraJSvsWasm(tiempoJS, tiempoWasm) {
  const tiempoMaximo = Math.max(tiempoJS, tiempoWasm);
  const duracionJS = (tiempoJS / tiempoMaximo) * 10;
  const duracionWasm = (tiempoWasm / tiempoMaximo) * 10;

  const autoJavaScript = document.getElementById("autoJavaScript");
  autoJavaScript.style.transition = `transform ${duracionJS}s linear`;
  autoJavaScript.style.transform = "scaleX(-1) translateX(-600px)";

  const autoWebAssembly = document.getElementById("autoWebAssembly");
  autoWebAssembly.style.transition = `transform ${duracionWasm}s linear`;
  autoWebAssembly.style.transform = "scaleX(-1) translateX(-600px)";
}
