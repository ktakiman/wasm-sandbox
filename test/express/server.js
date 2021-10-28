const express = require('express');
const app = express();
const port = 8085;

app.use('/', express.static('/home/ktakahaashi/dev/wasm/test'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
