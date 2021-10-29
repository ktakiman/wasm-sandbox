#include <iostream>
#include <numeric>

#include <emscripten/emscripten.h>

extern "C" {

EMSCRIPTEN_KEEPALIVE void sum(double* values, int length) {
  try {
    double sum = std::accumulate(values, values + length, 0.0);
    std::cout << sum;
    values[length] = sum;
  } catch(const std::exception& e) {
    std::cout << e.what() << std::endl;
  }
}

}

