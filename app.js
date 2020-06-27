
const express = require('express');
const path = require('path');
require('dotenv').config();

// Constants
const PORT = process.env.PORT || 4300;

// App
const app = express();

// app.use(express.static('dist/dist'));
app.use(express.static('dist/vendease-angular'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve('./dist/vendease-angular/index.html'));
});

app.listen(PORT);
console.log(`Running on http://localhost:${PORT}`);




