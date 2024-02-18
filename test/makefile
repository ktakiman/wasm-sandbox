BUILD_DIR=build/
SRC_DIR=src/
OBJ_DIR=obj/
ASSET_DIR=assets/


# compile to obj file
$(OBJ_DIR)%.o: $(SRC_DIR)%.cpp
	emcc -g -O0 $< -c -o $@
#
# each .cpp file might need to use different compiler options so 
# I'll just define a target for each case
all: hello add pixel-buf

# ----------------------------------------------------------------------------- 
# 01-hello  ~ just a main function which outputs to stdout
hello: $(BUILD_DIR)01-hello.html

$(BUILD_DIR)01-hello.html: $(SRC_DIR)01-hello.cpp
	emcc -g -O0 $< -o $@ 

hello-wasm: $(BUILD_DIR)01-hello-wasmonly.wasm
$(BUILD_DIR)01-hello-wasmonly.wasm: $(SRC_DIR)01-hello.cpp
	emcc -g -O0 $< -o $@ 

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
# 05-malloc  ~ 
malloc: $(BUILD_DIR)05-malloc.wasm $(BUILD_DIR)05-malloc.html $(BUILD_DIR)05-malloc.js  

$(BUILD_DIR)05-malloc.wasm: $(SRC_DIR)05-malloc.cpp
	emcc $< -o $@ -s EXPORTED_FUNCTIONS=_malloc,_free -O0 -g --no-entry

$(BUILD_DIR)05-malloc.html: $(ASSET_DIR)05-malloc.html
	cp $< $@

$(BUILD_DIR)05-malloc.js: $(ASSET_DIR)05-malloc.js
	cp $< $@

# ----------------------------------------------------------------------------- 
# 06-console-log  ~
console-log: $(BUILD_DIR)06-console-log.wasm $(BUILD_DIR)06-console-log.html $(BUILD_DIR)06-console-log.js

$(BUILD_DIR)06-console-log.wasm: $(SRC_DIR)06-console-log.cpp
	emcc $< -o $@ -s EXPORTED_FUNCTIONS=_malloc,_free -O0 -g --no-entry

$(BUILD_DIR)06-console-log.html: $(ASSET_DIR)06-console-log.html
	cp $< $@

$(BUILD_DIR)06-console-log.js: $(ASSET_DIR)06-console-log.js
	cp $< $@

# ----------------------------------------------------------------------------- 
# 07-fileio  ~ making fileio work in standalone mode is not trivial 
#              .wasm file seems to define imports for syscalls (i.e. __syscall__open)
#              only when compiled with .js/.html as output type
#              I'll just leave those files below maybe for later to take another look
fileio: $(BUILD_DIR)07-fileio.wasm $(BUILD_DIR)07-fileio.html $(BUILD_DIR)07-fileio.js

$(BUILD_DIR)07-fileio.wasm: $(SRC_DIR)07-fileio.cpp
	emcc $< -o $@ -s EXPORTED_FUNCTIONS=_malloc,_free -s -O0 -g --no-entry

$(BUILD_DIR)07-fileio.html: $(ASSET_DIR)07-fileio.html
	cp $< $@

$(BUILD_DIR)07-fileio.js: $(ASSET_DIR)07-fileio.js
	cp $< $@

# ----------------------------------------------------------------------------- 
# 08-fs  ~ explore FS provided by emscripten

fs: \
	$(BUILD_DIR)08-fs.js \
	$(BUILD_DIR)08-fs.html \
	$(BUILD_DIR)08-fs-custom.html \
	$(BUILD_DIR)08-fs-custom.js

$(BUILD_DIR)08-fs.html: $(SRC_DIR)08-fs.cpp  
	emcc $< -o $@ -O0 -g --preload-file $(ASSET_DIR)08-test.txt

$(BUILD_DIR)08-fs-custom.html: $(ASSET_DIR)08-fs-custom.html
	cp $< $@

$(BUILD_DIR)08-fs-custom.js: $(ASSET_DIR)08-fs-custom.js
	cp $< $@

# ----------------------------------------------------------------------------- 
# 09-exception  ~ explore exception handling

exception: $(BUILD_DIR)09-exception.html

$(BUILD_DIR)09-exception.html: $(OBJ_DIR)09-exception.o $(OBJ_DIR)09-exception-raii.o $(OBJ_DIR)09-exception-throw.o
	emcc -g -O0 $^ -o $@ 

# make .o file with -fexcetions turned on when compiling
$(OBJ_DIR)%.exc.o: $(SRC_DIR)%.cpp
	emcc -g -O0 -fexceptions $< -c -o $@

# compile catch site with -fexceptions
exception2: $(BUILD_DIR)09-exception2.html

$(BUILD_DIR)09-exception2.html: $(OBJ_DIR)09-exception.exc.o $(OBJ_DIR)09-exception-raii.o $(OBJ_DIR)09-exception-throw.o
	emcc -g -O0 -fexceptions $^ -o $@ 

# compile catch site and raii usage site ith -fexceptions
exception3: $(BUILD_DIR)09-exception3.html

$(BUILD_DIR)09-exception3.html: $(OBJ_DIR)09-exception.exc.o $(OBJ_DIR)09-exception-raii.exc.o $(OBJ_DIR)09-exception-throw.o
	emcc -g -O0 -fexceptions $^ -o $@ 
