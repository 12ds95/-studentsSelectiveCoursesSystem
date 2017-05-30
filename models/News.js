var mongoose = require('mongoose')
  , NewsSchema = require('../schemas/new')
  , News = mongoose.model('News',NewsSchema);

module.exports = News;
