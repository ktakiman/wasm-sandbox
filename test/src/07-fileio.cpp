#include "header/emsim.h"

#include <fstream>
#include <string>

extern "C" {
// extern void (*callback)();

void write() {
  std::ofstream fs;
  fs.open("/test.txt");

  if (fs.good()) {
    fs << "hi";
  }

  fs.close();
}

int read() {
  std::ifstream fs;
  fs.open("/test.txt");
  
  if (fs.good()) {
    return fs.tellg();
  }
  return -1;
}

EMSCRIPTEN_KEEPALIVE int readfile() {
  write();
  return 0;
}

}

