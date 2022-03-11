#include <iostream>

#include <emscripten/html5.h>

int main() {
  int w = 0;
  int h = 0;

  // emscripten's default html page creates a canvas with id='canvas'
  auto result = emscripten_get_canvas_element_size("#ccanvas", &w, &h);

  std::cout
    << "resutl: " << result << std::endl
    << "width:  " << w << std::endl 
    << "height: " << h << std::endl;

  return 0;
}
