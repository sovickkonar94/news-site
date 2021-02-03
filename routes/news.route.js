const router = require('express').Router();

const controller = require('../controllers/news.controller');


router.get('/top',controller.top);

router.post('/search',controller.search);


module.exports = router;