#include <cstring>
#include <iostream>

#include <emscripten/emscripten.h>

extern "C" {

EMSCRIPTEN_KEEPALIVE int Strlen(const char* ps) {
  try {
    int len = std::strlen(ps);
    std::cout << "length of '" << ps << "' is: " << len << std::endl;
    return len;
  } catch(const std::exception& e) {
    std::cout << e.what() << std::endl;
  }

  return -1;
}

}


