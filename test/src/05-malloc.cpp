#include <cstring>
#include <cstdlib>

#include "header/emsim.h"

extern "C" {

EMSCRIPTEN_KEEPALIVE int getAddr(const char* ps) {
  return (int)reinterpret_cast<long int>(ps);
}

EMSCRIPTEN_KEEPALIVE int allocMem(int size) {
  unsigned char* p = reinterpret_cast<unsigned char*>(malloc(size));

  for (int i = 0; i < size; ++i) {
    *p = 0x77;
  }
  
  return (int)reinterpret_cast<long int>(p);
}

EMSCRIPTEN_KEEPALIVE void freeMem(int addr) {
  free(reinterpret_cast<void*>(addr));
}

}



