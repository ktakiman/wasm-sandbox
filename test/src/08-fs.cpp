#include "header/emsim.h"

#include <fstream>
#include <iostream>
#include <string>

extern "C" {
// extern void (*callback)();

// void write() {
//   std::ofstream fs;
//   fs.open("/test.txt");

//   if (fs.good()) {
//     fs << "hi";
//   }

//   fs.close();
// }

void read() {
  std::ifstream fs;
  fs.open("assets/08-test.txt");
  
  while (!fs.eof()) {
    std::string ln;
    std::getline(fs, ln);
    std::cout << ln << std::endl;
  }
}

void log() {
  std::string hi("hi");
  std::cout << hi << std::endl;
}

EMSCRIPTEN_KEEPALIVE int main() {
  // log();
  read();

  return 0;
}

}

