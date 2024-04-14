# wasm-group-08
wasm-group-08 created by GitHub Classroom


emcc [path funcion] WASM=1 -s EXPORTED_FUNCTIONS= [funciones a exportar]

# Optimizadores: 
- O1 
- O2 
- Os 
- Oz 
- Og
- O3

# Comandos utilizados:

emcc lib/findPrimes.c -s WASM=1 -s EXPORTED_FUNCTIONS=_findPrimesC,_malloc,_free -o func/findPrimesO0.js

emcc -O1 lib/findPrimes.c -s WASM=1 -s EXPORTED_FUNCTIONS=_findPrimesC,_malloc,_free -o func/findPrimesO1.js

emcc -O2 lib/findPrimes.c -s WASM=1 -s EXPORTED_FUNCTIONS=_findPrimesC,_malloc,_free -o func/findPrimesO2.js

emcc -O3 lib/findPrimes.c -s WASM=1 -s EXPORTED_FUNCTIONS=_findPrimesC,_malloc,_free -o func/findPrimesO3.js

emcc -Os lib/findPrimes.c -s WASM=1 -s EXPORTED_FUNCTIONS=_findPrimesC,_malloc,_free -o func/findPrimesOs.js

emcc -Oz lib/findPrimes.c -s WASM=1 -s EXPORTED_FUNCTIONS=_findPrimesC,_malloc,_free -o func/findPrimesOz.js

emcc -Og lib/findPrimes.c -s WASM=1 -s EXPORTED_FUNCTIONS=_findPrimesC,_malloc,_free -o func/findPrimesOg.js

emcc lib/findPrimes.c -s WASM=1 -s EXPORTED_FUNCTIONS=_findPrimesC,_malloc,_free -s EXPORT_NAME="'ModuleO0'" -o func/findPrimesO0.js

emcc lib/findPrimes.c -s WASM=1 -s EXPORTED_FUNCTIONS=_findPrimesC,_malloc,_free -s MODULARIZE -o func/findPrimesO0.js

python3 -m http.server