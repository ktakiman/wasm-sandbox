let elemOutput;
let elemInput;

const compute = () => {

  const len = parseInt(elemInput.value);

  if (!(len > 0)) {
    elemOutput.innerText = "specify the number, please";
    return;
  }

  const array = new Float64Array(len + 1); // needs room for 5 extra items for output values

  for (let i = 0; i < len; i++) {
    array[i] = i + 1;
  }

  const buf = Module._malloc((len + 1) * array.BYTES_PER_ELEMENT);
  Module.HEAPF64.set(array, buf / array.BYTES_PER_ELEMENT);

  // execute a wasm function
  Module._sum(buf, len);

  const check = window.getValue(buf, 'double');

  console.log({ check });

  const result = window.getValue(buf + len * array.BYTES_PER_ELEMENT, 'double');

  elemOutput.innerText = `sum(1...${len}) = ${result}`;

  Module._free(buf);
};

window.onload = () => {
  const btn = document.getElementById('btn');
  btn.addEventListener('click', compute, false);

  elemInput = document.getElementById('input');
  elemOutput = document.getElementById('output');

  elemInput.value = "10000000";
};

