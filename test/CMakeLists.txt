cmake_minimum_required(VERSION 3.12)  

project(wasm LANGUAGES CXX)   

# set(CMAKE_VERBOSE_MAKEFILE ON)

message(emscripten=${EMSCRIPTEN})

set(files strlen big-allocate)

message(${CMAKE_SOURCE_DIR})
message(${CMAKE_BINARY_DIR})

set(CMAKE_VERBOSE_MAKEFILE ON)

if(EMSCRIPTEN)
  set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/public)
  set(CMAKE_EXECUTABLE_SUFFIX .html)
else()
  set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)
endif()

foreach(file IN LISTS files)
  set(cppfile src/${file}.cpp)
  message(${file})
  if(EMSCRIPTEN)
    add_executable(${file} ${cppfile})
    set_target_properties(${file} PROPERTIES LINK_FLAGS 
      "-g -s EXPORTED_RUNTIME_METHODS=ccall,cwrap -s EXPORTED_FUNCTIONS=@${CMAKE_SOURCE_DIR}/src/exported_functions.json")
  else()
    add_library(${file} ${cppfile})
  endif()
endforeach()
