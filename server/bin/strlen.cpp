#include <cstring>
#include <iostream>

#ifdef EMSCRIPTEN
#include <emscripten/emscripten.h>
#else
#define EMSCRIPTEN_KEEPALIVE 
#endif

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


