let HEAPU32;
let HEAP32;
let HEAPU8;

function environ_sizes_get() {
  console.log({ _: 'environ_sizes_get', arguments });
  return 0;
}

const encoder = new TextEncoder();

let fd_read_call_ct = 0;

function fd_read(fd, iov, iovcnt, pnum) {
  if (fd_read_call_ct > 0) {
    HEAPU32[(pnum >> 2)] = 0;
    return 0;
  }
  const start = iov >> 2;
  const u32addr = start; // + i * 2;
  const addr = HEAPU32[u32addr];
  const len = HEAPU32[u32addr + 1]

  console.log({ addr, len });

  const writeTo = HEAPU8.subarray(addr, addr + len);
  const encodeResult = encoder.encodeInto("hello\nhere\0", writeTo);

  console.log({ encodeResult });

  HEAPU32[(pnum >> 2)] = encodeResult.written;

  fd_read_call_ct++;

  return 0;
}

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
  

  return 0;
}

const decoder = new TextDecoder();

function utf8str(ptr) {
  let to = ptr;
  while (HEAPU8[to++]);

  return decoder.decode(HEAPU8.subarray(ptr, to - 1));
}

function __syscall_open(ptr, mode, what) {
  const filename = utf8str(ptr);
  console.log({ _: 'fopen', ptr, filename, mode, what });

  return 3;
}

function emscripten_memcpy_big(a, b, c) {
}

const sim = name => function() {
  console.log({ _: name, args: arguments });
  return 0;
};

const importEnv = {
  'proc_exit': sim('proc_exit'),
  'emscripten_memcpy_big': sim('emscripten_memcpy_big'),
  'emscripten_resize_heap': sim('emscripten_resize_heap'),
  __syscall_open,
  '__syscall_fcntl64': sim('__syscall_fcntl64'),
  '__syscall_ioctl': sim('__syscall_ioctl'),
  'abort': sim('abort'),
  'strftime_l': sim('strftime_l'),
  'setTempRet0': sim('setTempRet0')
};

const importWasi = {
  fd_write,
  fd_read,
  'fd_close': sim('fd_close'),
  'fd_seek': sim('fd_seek'),
  'environ_sizes_get': environ_sizes_get,
  'environ_get': sim('environ_get'),
};

const importObject = {
  'env': importEnv,
  'wasi_snapshot_preview1': importWasi,
};

WebAssembly.instantiateStreaming(fetch('08-fs.wasm'), importObject).then(obj => {
  console.log({ obj });

  const exports = obj.instance.exports;
  const { main, malloc, free, __wasm_call_ctors } = exports;

  const buf = exports.memory.buffer;
  const addr = 0x0000;
  HEAPU32 = new Uint32Array(buf, addr, buf.byteLength >> 2);
  HEAP32 = new Int32Array(buf, addr, buf.byteLength >> 2);
  HEAPU8 = new Uint8Array(buf, addr, buf.byteLength);

  // const callback = void function() {
  //   console.log('called from c++!!');
  // };

  // need to call this to setup stdin/out
  __wasm_call_ctors();

  main();
});
