var mongoose = require('mongoose')
  , NewsSchema = require('../schemas/news')
  , News = mongoose.model('News',NewsSchema);

module.exports = News;
