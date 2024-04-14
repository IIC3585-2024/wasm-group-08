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
});

function iniciarCarrera(numero) {
  // Aqui deberia haber una funcion o algo que obtenga los resultados de los algoritmos
  const factoresSimulados = []; // Averiguar como obtener resultado del agloritmo
  globalTiempoJavaScript = simularTiempoDeEjecucion(); // Averiguar como obtener tiempo del algoritmo
  globalTiempoWebAssembly = simularTiempoDeEjecucion(true); // Averiguar como obtener tiempo del algoritmo

  const mensajeResultado = `Carrera completada. <br> JavaScript terminó en ${globalTiempoJavaScript}ms. <br> WebAssembly terminó en ${globalTiempoWebAssembly}ms. <br> ¡Parece que tenemos un ganador!`;

  // Mostramos el resultado y los factores primos.
  mostrarResultado(mensajeResultado, factoresSimulados);
}

// Esta funcion deberia cambiarla por obtener el resultado del algorimto o
// borrar esta funcion si es que lo hago todo en function iniciarCarrera
function simularTiempoDeEjecucion(esWebAssembly = false) {
  // Simula un tiempo más corto para WebAssembly para seguir la narrativa
  const baseTime = 1000; // 1000 ms = 1 segundo
  return esWebAssembly
    ? baseTime * Math.random()
    : baseTime * 1.5 + baseTime * Math.random();
}

function mostrarResultado(mensaje, factores = []) {
  const resultadoDiv = document.getElementById("resultado");
  const factoresTexto =
    factores.length > 0
      ? `Los números primos que multiplicados dan este número son: ${factores.join(
          ", "
        )}.`
      : ""; // Aqui ns que poner aun
  resultadoDiv.innerHTML = `${mensaje}<br>${factoresTexto}`;
}

document.getElementById("verCarrera").addEventListener("click", () => {
  iniciarCarreraJSvsWasm(globalTiempoJavaScript, globalTiempoWebAssembly);
});

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
