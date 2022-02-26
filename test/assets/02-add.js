const importObject = {};

WebAssembly.instantiateStreaming(fetch('02-add.wasm'), importObject).then(obj => {
  console.log({ obj });

  const exports = obj.instance.exports;
  const add = exports.add

  console.log({ add: add(1, 2) });

  const left = document.getElementById('left');
  const right = document.getElementById('right');
  const answer = document.getElementById('answer');

  const compute = () => {
    const v1 = parseFloat(left.value);
    const v2 = parseFloat(right.value);

    if (v1 !==null && v2 !== null) {
      answer.innerText = add(v1, v2);
    }
  };

  left.addEventListener('change', compute);
  right.addEventListener('change', compute);

});
