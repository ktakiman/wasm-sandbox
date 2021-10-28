#include <cmath>
#include <tuple>
#include <vector>
#include <iostream>

#include <emscripten/emscripten.h>

extern "C" {

EMSCRIPTEN_KEEPALIVE double WasmSqrt(double v) {
  return std::sqrt(v);
}

EMSCRIPTEN_KEEPALIVE double WasmDynamicAllocate(int v) {
  std::vector<int> vec(10.0, v);
  return *vec.begin();
}

int main(int argc, char** argv) {
  std::cout << "howdy!" << std::endl;
  printf("konnichiwa\n");

  return 0;
}

}
