BUILD_DIR=build/
SRC_DIR=src/

SOURCE=hello_triangle

all: $(BUILD_DIR)$(SOURCE).html 

$(BUILD_DIR)$(SOURCE).html: $(BUILD_DIR)$(SOURCE).o # $(BUILD_DIR)esUtil.o
	@echo $*
	emcc -g $^ -o $@ 

$(BUILD_DIR)%.o: $(SRC_DIR)%.c
	emcc $< -c -o $@

clean: 
	-rm $(BUILD_DIR)$(SOURCE).*

clean-all:
	-rm $(BUILD_DIR)*

