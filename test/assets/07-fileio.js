function fd_write(fd, iov, iovcnt, pnum) {
  console.log({ fd, iov, iovcnt, pnum });
  debugger;

  const start = iov >> 2;

  const decoder = new TextDecoder();

  let handled = 0;

  for (let i = 0; i < iovcnt; i++) {
    const u32addr = start + i * 2;
    const addr = HEAPU32[u32addr];
    const len = HEAPU32[u32addr + 1]

    const txt = decoder.decode(HEAPU8.subarray(addr, addr + len));

    console.log({ _: 'stdout', txt });

    handled += len;
  }
  

  return handled;
}

const sim = name => function() {
  console.log({ _: 'sim', name });
  return 0;
};

const importFuncs = {
  'proc_exit': sim('proc_exit'),
  'fd_seek': sim('fd_seek'),
  'fd_write': fd_write,
  'fd_read': sim('fd_read'),
  'fd_close': sim('fd_close'),
  'environ_sizes_get': sim('environ_sizes_get'),
  'environ_get': sim('environ_get')
};

const importObject = {
  'wasi_snapshot_preview1': importFuncs,
  'env': importFuncs
};

let HEAPU32;
let HEAPU8;

WebAssembly.instantiateStreaming(fetch('07-fileio.wasm'), importObject).then(obj => {
  console.log({ obj });

  // debugger;

  const exports = obj.instance.exports;
  const { readfile /*, malloc, free*/ } = exports;

  const buf = exports.memory.buffer;
  const addr = 0x0000;
  HEAPU32 = new Uint32Array(buf, addr, buf.byteLength >> 2);
  HEAPU8 = new Uint8Array(buf, addr, buf.byteLength);

  // const callback = void function() {
  //   console.log('called from c++!!');
  // };

  // log(callback);
  //
  readfile();
});
