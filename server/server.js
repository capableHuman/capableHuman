const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
);

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});