const express = require('express');
const artistController = require('../controllers/artistController');

function routes() {
  const artistRouter = express.Router();
  controller = artistController();
  artistRouter.get('/artists', controller.get);

  return artistRouter;
}

module.exports = routes;
