#include <iostream>

#include "09-exception-throw.h"

class Raii {
public:
  Raii() { std::cout << "Raii ctor" << std::endl; }
  ~Raii() { std::cout << "Raii dtor" << std::endl; }
};

void MakeRaii() {
  Raii raii;

  Throw();
}
