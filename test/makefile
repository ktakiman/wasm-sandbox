BUILD_DIR=build/
SRC_DIR=src/
ASSET_DIR=assets/

# each .cpp file might need to use different compiler options so 
# I'll just define a target for each case

all: hello add pixel-buf

# ----------------------------------------------------------------------------- 
# 01-hello  ~ just a main function which outputs to stdout
hello: $(BUILD_DIR)01-hello.html

$(BUILD_DIR)01-hello.html: $(SRC_DIR)01-hello.cpp
	emcc $< -o $@ 

hello-wasm: $(BUILD_DIR)01-hello-wasmonly.wasm

$(BUILD_DIR)01-hello-wasmonly.wasm: $(SRC_DIR)01-hello.cpp
	emcc $< -o $@ 

# ----------------------------------------------------------------------------- 
# 02-add  ~ pure compute function only
add: $(BUILD_DIR)02-add.wasm $(BUILD_DIR)02-add.html $(BUILD_DIR)02-add.js  

$(BUILD_DIR)02-add.wasm: $(SRC_DIR)02-add.cpp
	emcc -g -O0 --no-entry $< -o $@

# TODO: can I define this in more generic way, use wildcard maybe ??
$(BUILD_DIR)02-add.html: $(ASSET_DIR)02-add.html
	cp $< $@

$(BUILD_DIR)02-add.js: $(ASSET_DIR)02-add.js
	cp $< $@

# ----------------------------------------------------------------------------- 
# 03-pixel-buf ~ update canvas's pixel buffer within c++ function (shared memory usage)
pixel-buf: $(BUILD_DIR)03-pixel-buf.wasm $(BUILD_DIR)03-pixel-buf.html $(BUILD_DIR)03-pixel-buf.js  

$(BUILD_DIR)03-pixel-buf.wasm: $(SRC_DIR)03-pixel-buf.cpp
	emcc -O0 -g --no-entry $< -o $@

$(BUILD_DIR)03-pixel-buf.html: $(ASSET_DIR)03-pixel-buf.html
	cp $< $@

$(BUILD_DIR)03-pixel-buf.js: $(ASSET_DIR)03-pixel-buf.js
	cp $< $@

# ----------------------------------------------------------------------------- 
# 04-strlen  ~ js calls into a cpp function which takes a const char* 
strlen: $(BUILD_DIR)04-strlen.wasm $(BUILD_DIR)04-strlen.html $(BUILD_DIR)04-strlen.js  

$(BUILD_DIR)04-strlen.wasm: $(SRC_DIR)04-strlen.cpp
	emcc -O0 -g --no-entry $< -o $@

$(BUILD_DIR)04-strlen.html: $(ASSET_DIR)04-strlen.html
	cp $< $@

$(BUILD_DIR)04-strlen.js: $(ASSET_DIR)04-strlen.js
	cp $< $@

# ----------------------------------------------------------------------------- 
# 05-malloc  ~ js calls into a cpp function which takes a const char* 
malloc: $(BUILD_DIR)05-malloc.wasm $(BUILD_DIR)05-malloc.html $(BUILD_DIR)05-malloc.js  

$(BUILD_DIR)05-malloc.wasm: $(SRC_DIR)05-malloc.cpp
	emcc $< -o $@ -s EXPORTED_FUNCTIONS=_malloc,_free -O0 -g --no-entry

$(BUILD_DIR)05-malloc.html: $(ASSET_DIR)05-malloc.html
	cp $< $@

$(BUILD_DIR)05-malloc.js: $(ASSET_DIR)05-malloc.js
	cp $< $@

