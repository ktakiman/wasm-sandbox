#include <cstdio>

#include "header/emsim.h"

extern "C" {
// extern void (*callback)();

EMSCRIPTEN_KEEPALIVE void log() {
  // callback();
  std::printf("hi\n");
}

}
