const express = require('express');
const injuryController = require('../controllers/injury.controller');
const router = express.Router();

router.get('/', injuryController.getAll);
router.post('/', injuryController.create);
router.patch('/:id', injuryController.update);
router.delete('/:id', injuryController.delete);

module.exports = router;