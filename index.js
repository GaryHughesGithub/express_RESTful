const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/tacos', (req, res) => {
  res.send('GET /tacos response');
})

app.post('/tacos', (req, res) => {
  const {meat,qty} = req.body;
  res.send(`OK here are your ${qty} ${meat} taco's!`)
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})


// GET /comments - list all comments
// POST /comments - create a new comment
// GET /comments/:id - get one comment (using id)
// PATCH /comments/:id - update one comments
// DELETE - remove or destroy one comment