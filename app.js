import Express from 'express';
import bodyParser from 'body-parser';

import Post from './entities/Post.js';

const posts = [
  new Post('hello', 'how are you?'),
  new Post('nodejs', 'story about nodejs'),
];

export default () => {
  const app = new Express();
  app.set('view engine', 'pug');
  app.use(bodyParser.urlencoded({ extended: false }));

  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/posts', (req, res) => {
    res.render('posts/index', { posts });
  });

  app.get('/posts/new', (req, res) => {
    res.render('posts/new');
  });

  app.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    const post = posts.find((el) => String(el.id) === id);
    
    if (!post) {
      res.sendStatus(404);
    } else {
      res.render('posts/show', { ...post });
    }
  });

  app.post('/posts', (req, res) => {
    const post = req.body;
    if (Object.keys(post).length === 0) {
      res.sendStatus(422);
    } else {
      const newPost = new Post(post.title, post.body);
      posts.push(newPost);
      res.redirect(`posts/${newPost.id}`);
    }
  });

  return app;
};