#include "header/emsim.h"

extern "C" {

EMSCRIPTEN_KEEPALIVE void update(int w, int h, unsigned char* buf) {
  *buf = 0x80;
  for (int y = 120; y < 400; ++y) {
    for (int x = 120; x < 400; ++x) {
      int idx = (y * w + x) * 4;
      *(buf + idx) = (x + y) % 0xff; 
      *(buf + idx + 1) = (x * 83 + y * 3) % 0xff;
      *(buf + idx + 2) = (x * 10 + y * 20) % 0xff;
      *(buf + idx + 3) = 0xff;
    }
  }
}

}
