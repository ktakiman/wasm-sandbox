#include <iostream>


// compiling this with simplest form of emcc
//   $ emcc 01-hello.cpp -o build/01-hello.html
// 'hello' is shown in Console window.
// also can be seen in the output area in default-generated .html file
// emscripten generated .html and especially .js file provides a glueing layer
// between browser and c++, so what comes out of this case is not necessary 
// a simplest case to look at (if digging deeper)

int main() {

  std::cout << "hello" << std::endl;
  return 0;
}
