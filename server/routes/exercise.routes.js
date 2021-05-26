const express = require('express');
const exerciseController = require('../controllers/exercise.controller');
const router = express.Router();

router.get('/', exerciseController.getAll);
router.post('/', exerciseController.create);
router.patch('/:id', exerciseController.update);
router.delete('/:id', exerciseController.delete);

module.exports = router;