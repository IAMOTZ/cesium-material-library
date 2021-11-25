const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

let materialsDB = [];

const delay = (time) => new Promise((res, rej) => {
  setTimeout(() => { res() }, time)
});

app.get('/materials', (req, res) => {
  return res.json(materialsDB)
});

app.post('/materials', async (req, res) => {
  const { name, volume, deliveryDate, color, cost } = req.body;
  const material = { id: uuidv4(), name, volume, deliveryDate, color, cost };
  materialsDB.push(material);

  await delay(5000);

  return res.json(material)
});

app.put('/materials/:materialId', async (req, res) => {
  const { materialId } = req.params;
  const material = materialsDB.find(material => material.id === materialId);

  if (!material) return res.status(404).end();

  materialsDB = materialsDB.map(material => {
    if (material.id !== materialId) return material;
    return {
      ...material,
      ...req.body,
    }
  });

  await delay(5000);

  return res.status(200).end();
});

app.delete('/materials/:materialId', async (req, res) => {
  const { materialId } = req.params;
  const material = materialsDB.find(material => material.id === materialId);

  if (!material) res.status(404).end();

  materialsDB = materialsDB.filter(material => material.id !== materialId);

  await delay(5000);

  return res.status(200).end();
});

