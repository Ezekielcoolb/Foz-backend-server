


const mongoose = require('mongoose');


const divImageSchema = new mongoose.Schema({
    title: String,
    paragraph: String,
    divImage: {
        filename: String,
        url: String
    }, 
  
});

const DivImage = mongoose.model('divImage', divImageSchema);

module.exports = DivImage;
