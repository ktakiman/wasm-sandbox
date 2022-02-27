const importObject = {};

WebAssembly.instantiateStreaming(fetch('05-malloc.wasm'), importObject).then(obj => {
  console.log({ obj });

  const exports = obj.instance.exports;
  const { getAddr, allocMem, freeMem, malloc, free } = exports;

  // directly write down to the memory exported from wasm
  // not 100% sure if I can just get to use all of it freely...
  const buf = exports.memory.buffer;
  const addr = 0x0000;
  const mem_view = new Uint8Array(buf, addr, buf.byteLength);

  // malloc just returns integer, which is probably an address for exports.memory
  const mem1 = malloc(0x10);
  const mem2 = malloc(0x10);

  // call custom function which calls malloc internally.
  // the address returned is very close proximity to the one returned from exported malloc
  // so both versions are essentially doing the same thing
  const mem3 = allocMem(0x10);
  const mem4 = allocMem(0x10);

  const addr1 = getAddr(mem1);
  const addr2 = getAddr(mem2);
  const addr3 = getAddr(mem3);
  const addr4 = getAddr(mem4);

  console.log({ addr1, addr2, addr3, addr4 });

  free(mem1);
  free(mem2);
  freeMem(mem3);
  freeMem(mem4);

  for (var i = 0; i < 10; i++) {
    // will get the same address
    const mem5 = malloc(0x1000);
    console.log({ mem5 });
    free(mem5);
  }
});
