const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const comments = [
  {
    username:'Gary',
    comment:'May the force be with you'
  },
  {
    username:'Yoda',
    comment:'Do or do not, there is no try'
  },
  {
    username:'Obi Wan',
    comment:'Hello there'
  }
];

app.get('/comments', (req, res) => {
  res.render('comments/index', { comments })
})

app.get('/comments/new', (req, res) => {
  res.render('comments/new')
})

app.post('/comments', (req, res) => {
  const { username, comment } = req.body; 
  comments.push({username,comment})
  res.redirect("/comments");  //default status code 302 for redirect
})



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