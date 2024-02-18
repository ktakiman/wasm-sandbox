const importObject = {};

WebAssembly.instantiateStreaming(fetch('04-strlen.wasm'), importObject).then(obj => {
  console.log({ obj });

  const exports = obj.instance.exports;
  const getLen = exports.getLen

  // directly write down to the memory exported from wasm
  // this worked, but probably should not the memory buffer this way,
  // I should probably export malloc and free from wasm, and allocate memory with these
  const buf = exports.memory.buffer;
  const addr = 0x0000;
  const mem_view = new Uint8Array(buf, addr, 0x100);

  const encoder = new TextEncoder();

  const str = document.getElementById('str');
  const len = document.getElementById('len');

  const compute = () => {
    const { written } = encoder.encodeInto(str.value, mem_view);
    mem_view[written] = 0;
    len.innerText = getLen(mem_view.byteOffset);
  };

  str.addEventListener('change', compute);
});
