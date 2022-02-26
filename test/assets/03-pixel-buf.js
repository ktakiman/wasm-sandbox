const importObject = {};

const allocateMemory = (w, h, update) => {
  const buf_size = w * h * 4;
  const page_size = 0x10000;
  const page_ct = Math.floor((buf_size + page_size) / page_size); 

  // This memory is owned by browser? So, only way for .wasm to access this is to get this reference as
  // an import to that wasm module???
  const mem = new WebAssembly.Memory({ initial: page_ct, maximum: page_ct, shared: true });
  const buf = mem.buffer;

  const data = new Uint8Array(buf, 0x0000, w * h * 4);

  update(data);

  return data;
};

const useWasmMemory = (mem, w, h, update) => {
  const addr = 0x1000;  // not sure where in wasm memory it's OK to mess with ...
                         // Ben Smith used this address in his talk: https://youtu.be/qEq3F9Z8z6w?t=545
                         // but of course, he's not using Emscripten generated .wasm file

  const data = new Uint8Array(mem.buffer, addr, w * h * 4); 

  update(data);

  return data;
};


WebAssembly.instantiateStreaming(fetch('03-pixel-buf.wasm'), importObject).then(obj => {
  console.log({ obj });

  const exports = obj.instance.exports;
  const update = exports.update;

  const w = 400;
  const h = 400;

  const updateBuffer = data => {
    for (var x = 0; x < 100; x++) {
      for (var y = 0; y < 100; y++) {
        const idx = ((y * w) + x) * 4;
        data[idx] = x * 2; // R
        data[idx + 1] = y * 2; // G
        data[idx + 2] = (x + y) * 1.2; // B
        data[idx + 3] = 255; // alpha
      }
    }

    // data[0] = 0x77;
  };

  // const data = allocateMemory(w, h, updateBuffer);

  const data = useWasmMemory(exports.memory, w, h, updateBuffer);

  update(w, h, 0x1000);

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(w, h);
  imgData.data.set(data);

  ctx.putImageData(imgData, 0 ,0);
});
