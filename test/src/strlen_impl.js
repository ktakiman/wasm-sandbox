let elemOutput;
let elemInput;

const compute = () => {

  const s = elemInput.value;

  if (!(s?.length > 0)) {
    elemOutput.innerText = "put some text, please";
    return;
  }

  const ptr  = allocate(intArrayFromString(s), ALLOC_NORMAL);
  const len = Module._Strlen(ptr);
  _free(ptr);

  elemOutput.innerText = `length = ${len}`;

  // create a wrapped function!!!
  const wrapped = cwrap('Strlen', 'number', ['string']);
  const len2 = wrapped(s);

  console.log(`wrapped returned: ${len2}`);

};

window.onload = () => {
  const btn = document.getElementById('btn');
  btn.addEventListener('click', compute, false);

  elemInput = document.getElementById('input');
  elemOutput = document.getElementById('output');

  elemInput.value = "hello";
};


