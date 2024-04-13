# wasm-group-08
wasm-group-08 created by GitHub Classroom

emcc lib/add.c -s WASM=1 -s EXPORTED_FUNCTIONS=_sum_array,_malloc,_free -o func/add.js
emcc [path funcion] WASM=1 -s EXPORTED_FUNCTIONS= [funciones a exportar]

emcc path_to_c_file.cpp -O3 -s

emcc lib/findPrimes.c -s WASM=1 -s EXPORTED_FUNCTIONS=_findPrimesC,_malloc,_free -o func/findPrimes.js

python3 -m http.server