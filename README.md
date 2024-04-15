# wasm-group-08

wasm-group-08 created by GitHub Classroom

# Optimizadores utilizados:

- O1
- O2
- Os
- Oz
- Og
- O3

# Comandos utilizados:

## Para activar emcc:

- `./emsdk activate latest`

- `source ./emsdk_env.sh`

## Para compilar codigo C con diferentes optimizadores:

- `emcc lib/findPrimes.c -s WASM=1 -s EXPORTED_FUNCTIONS=_findPrimesC,_malloc,_free -s EXPORT_NAME="'ModuleO0'" -s MODULARIZE=1 -o func/findPrimesO0.js`

- `emcc -O1 lib/findPrimes.c -s WASM=1 -s EXPORTED_FUNCTIONS=_findPrimesC,_malloc,_free -s EXPORT_NAME="'ModuleO1'" -s MODULARIZE=1 -o func/findPrimesO1.js`

- `emcc -O2 lib/findPrimes.c -s WASM=1 -s EXPORTED_FUNCTIONS=_findPrimesC,_malloc,_free -s EXPORT_NAME="'ModuleO2'" -s MODULARIZE=1 -o func/findPrimesO2.js`

- `emcc -O3 lib/findPrimes.c -s WASM=1 -s EXPORTED_FUNCTIONS=_findPrimesC,_malloc,_free -s EXPORT_NAME="'ModuleO3'" -s MODULARIZE=1 -o func/findPrimesO3.js`

- `emcc -Os lib/findPrimes.c -s WASM=1 -s EXPORTED_FUNCTIONS=_findPrimesC,_malloc,_free -s EXPORT_NAME="'ModuleOs'" -s MODULARIZE=1 -o func/findPrimesOs.js`

- `emcc -Oz lib/findPrimes.c -s WASM=1 -s EXPORTED_FUNCTIONS=_findPrimesC,_malloc,_free -s EXPORT_NAME="'ModuleOz'" -s MODULARIZE=1 -o func/findPrimesOz.js`

- `emcc -Og lib/findPrimes.c -s WASM=1 -s EXPORTED_FUNCTIONS=_findPrimesC,_malloc,_free -s EXPORT_NAME="'ModuleOg'" -s MODULARIZE=1 -o func/findPrimesOg.js`

## Para ejecutar el programa:

- Se utilizó la extensión de VSCode Live Server
