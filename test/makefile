BUILD_DIR=build/
SRC_DIR=src/
ASSET_DIR=assets/

# each .cpp file might need to use different compiler options so 
# I'll just define a target for each case

all: hello-html add-wasm pixel-buf-wasm

# ----------------------------------------------------------------------------- 
# 01-hello  ~ just a main function which outputs to stdout
hello-html: $(BUILD_DIR)01-hello.html

$(BUILD_DIR)01-hello.html: $(SRC_DIR)01-hello.cpp
	emcc $< -o $@ 

hello-wasm: $(BUILD_DIR)01-hello-wasmonly.wasm

$(BUILD_DIR)01-hello-wasmonly.wasm: $(SRC_DIR)01-hello.cpp
	emcc $< -o $@ 

# ----------------------------------------------------------------------------- 
# 02-add  ~ pure compute function only
add-wasm: $(BUILD_DIR)02-add.wasm $(BUILD_DIR)02-add.html $(BUILD_DIR)02-add.js  

$(BUILD_DIR)02-add.wasm: $(SRC_DIR)02-add.cpp
	emcc -O3 --no-entry $< -o $@

$(BUILD_DIR)02-add.html: $(ASSET_DIR)02-add.html
	cp $< $@

$(BUILD_DIR)02-add.js: $(ASSET_DIR)02-add.js
	cp $< $@

# ----------------------------------------------------------------------------- 
# 03-pixel-buf ~ update canvas's pixel buffer within c++ function
pixel-buf-wasm: $(BUILD_DIR)03-pixel-buf.wasm $(BUILD_DIR)03-pixel-buf.html $(BUILD_DIR)03-pixel-buf.js  

$(BUILD_DIR)03-pixel-buf.wasm: $(SRC_DIR)03-pixel-buf.cpp
	emcc -O0 -g --no-entry $< -o $@

$(BUILD_DIR)03-pixel-buf.html: $(ASSET_DIR)03-pixel-buf.html
	cp $< $@

$(BUILD_DIR)03-pixel-buf.js: $(ASSET_DIR)03-pixel-buf.js
	cp $< $@

# ----------------------------------------------------------------------------- 
# 04-greet  ~ js calls into a cpp function which takes a const char* 
greet-html: $(BUILD_DIR)04-greet.html

$(BUILD_DIR)04-greet.html: $(SRC_DIR)04-greet.cpp
	emcc $< -o $@ -s EXPORTED_FUNCTIONS="['_greet']"
