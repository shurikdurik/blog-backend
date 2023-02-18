import app from '../app.js';

const port = 8080;
app().listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server was started on '${port}'`);
});