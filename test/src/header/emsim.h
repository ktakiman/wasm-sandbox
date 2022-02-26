#pragma once

// a simple sim to make .clagd happy
// I can add more fake emscripten macros when I start using those

#ifdef EMSCRIPTEN
#include <emscripten/emscripten.h>
#else
#define EMSCRIPTEN_KEEPALIVE 
#endif
