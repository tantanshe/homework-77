import express from 'express';
import fileDb from '../fileDb';
import {Guest} from '../types';
import {imagesUpload} from '../multer';

const guestsRouter = express.Router();

guestsRouter.get('/', async (req, res) => {
  const guests = await fileDb.getGuests();
  res.send(guests);
});

guestsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
  if (!req.body.message) {
    return res.status(400).send({'error': 'Message must be present in the request'});
  }
  const guest: Guest = {
    author: req.body.author,
    message: req.body.message,
    image: req.file ? req.file.filename : null,
  };
  const savedMessage = await fileDb.addGuest(guest);
  res.send(savedMessage);
});

export default guestsRouter;