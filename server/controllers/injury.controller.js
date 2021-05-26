const Injury = require('../models/injury.model');
const factory = require('./handlerFactory');

exports.getAll = factory.getAll(Injury);
exports.getOne = factory.getOne(Injury);
exports.create = factory.createOne(Injury);
exports.update = factory.updateOne(Injury);
exports.delete = factory.deleteOne(Injury);