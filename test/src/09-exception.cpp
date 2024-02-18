#include <iostream>

#include "09-exception-raii.h"

int main(int argc, char *argv[]) {
  //
  std::cout << "hey" << std::endl;

  try {
    MakeRaii();
  } catch (std::exception &) {
    std::cout << "caught!" << std::endl;
  }
}
