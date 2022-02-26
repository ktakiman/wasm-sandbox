#include "header/emsim.h"

extern "C" {

EMSCRIPTEN_KEEPALIVE int add(int x, int y) {
  return x + y;
}

}
