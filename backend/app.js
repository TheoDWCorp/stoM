const express = require('express');
const path = require('path');
const app = express();

// Servir les fichiers statiques depuis le répertoire dist
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Route pour servir l'application Vue.js
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

// Autres routes et configuration...

app.listen(3002, () => {
  console.log('Server is running on port 3002');
});