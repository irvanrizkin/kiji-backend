const express = require('express');
const cors = require('cors');
const comment = require('./routes/comment.route');
const article = require('./routes/article.route');
const user = require('./routes/user.route');

require('dotenv').config();

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (_, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.use('/articles', article);
app.use('/comments', comment);
app.use('/users', user);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Your app is running at port ${PORT}`);
});