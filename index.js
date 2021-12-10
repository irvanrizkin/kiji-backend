const express = require('express');

require('dotenv').config();

const app = express();

app.use(express.json());

app.get('/', (_, res) => {
  res.json({
    status: true,
    message: 'First endpoint',
  })
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Your app is running at port ${PORT}`);
});