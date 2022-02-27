#include <cstring>

#include "header/emsim.h"

extern "C" {

EMSCRIPTEN_KEEPALIVE int getLen(const char* ps) {
  return std::strlen(ps);
}

}


