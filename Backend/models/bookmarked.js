const mongoose = require('mongoose');

const bookmarkedSchema = new mongoose.Schema({
    title: String,
    url: String
});

//const BookmarkedModel = mongoose.model('bookmarked', bookmarkedSchema);

module.exports = {bookmarkedSchema};
