BUILD_DIR=build/
SRC_DIR=src/

SOURCE=canvas2d

all: $(BUILD_DIR)$(SOURCE).html 

$(BUILD_DIR)$(SOURCE).html: $(BUILD_DIR)$(SOURCE).o $(BUILD_DIR)canvas.o
	@echo $*
	emcc -g $^ -o $@ 

$(BUILD_DIR)%.o: $(SRC_DIR)%.c
	emcc $< -c -o $@

clean: 
	-rm $(BUILD_DIR)$(SOURCE).*

clean-all:
	-rm $(BUILD_DIR)*

