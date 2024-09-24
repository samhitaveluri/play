const express = require('express');
const podcastController = require('../controllers/podcastController');
const multer = require('multer');

function routes(database) {
  const podcastRouter = express.Router();
  const controller = podcastController(database);
  const upload = configureMulter();
  const multUpload = upload.fields([{ name: 'image' }, { name: 'audio' }]);

  function configureMulter() {
    const storage = multer.memoryStorage();
    const upload = multer({
      storage: storage,
      limits: { fileSize: 7000000 },
    });
    return upload;
  }

  //todo error handling
  podcastRouter.get('/podcasts', controller.get);

  podcastRouter.get('/podcasts/:id', controller.getById);

  podcastRouter.get('/audio/:podcastId', controller.streamPodcastById);

  podcastRouter.post('/podcasts', multUpload, controller.post);

  podcastRouter.delete('/podcasts/:id', controller.deleteById);

  return podcastRouter;
}

module.exports = routes;
