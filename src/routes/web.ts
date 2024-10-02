import { Router } from 'express';

const webRouter = (): Router => {
  const web = Router();

  web.get('/', (req, res) => {
    res.send('Hello World');
  })
  return web;
}

export default webRouter;