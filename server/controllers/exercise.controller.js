const Exercise = require('../models/exercise.model');
const factory = require('./handlerFactory');

exports.getAll = factory.getAll(Exercise);
exports.getOne = factory.getOne(Exercise);
exports.create = factory.createOne(Exercise);
exports.update = factory.updateOne(Exercise);
exports.delete = factory.deleteOne(Exercise);