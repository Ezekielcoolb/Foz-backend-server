


const mongoose = require('mongoose');


const latestSchema = new mongoose.Schema({
    title: String,
   paragraph: String,
    latestImage: {
        filename: String,
        filepath: String
    }
});

const Latest = mongoose.model('Latest', latestSchema);

module.exports = Latest;
