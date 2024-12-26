const express = require('express');
const cors = require('cors');
const joyasRoutes = require('./routes/joyas.routes');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  next();
});

app.use('/', joyasRoutes);

app.get('/', (req, res) => {
  res.send('API');
});

app.listen(port, () => {
  console.log(`Servidor corriendo http://localhost:${port}`);
});
