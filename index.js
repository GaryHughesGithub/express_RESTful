const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let comments = [
  {
    id:uuid(),
    username:'Gary',
    comment :'May the force be with you'
  },
  {
    id:uuid(),
    username:'Yoda',
    comment :'Do or do not, there is no try'
  },
  {
    id:uuid(),
    username:'Obi Wan',
    comment :'Hello there'
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
  comments.push({username,comment, id: uuid()})
  res.redirect("/comments");  //default status code 302 for redirect
})


app.get('/comments/:id', (req,res) => {
  const { id } = req.params;
  const comment = comments.find(c => c.id === id)
  res.render('comments/show', { comment }) //important!! do not add a forward slash at the start of the path!!
})

app.patch('/comments/:id', (req, res) => {
  const { id } = req.params;
  const newCommentText = req.body.comment;
  const foundComment = comments.find(c => c.id === id)
  foundComment.comment = newCommentText;
  res.redirect('/comments');
})

app.get('/comments/:id/edit', (req , res) => {
  const { id } = req.params;
  const comment = comments.find(c => c.id === id);
  res.render('comments/edit' , {comment})
})

app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  comments = comments.filter(c => c.id !== id);
  res.redirect('/comments');
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