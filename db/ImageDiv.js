


const mongoose = require('mongoose');


const divImageSchema = new mongoose.Schema({
    title: String,
    paragraph: String,
    divImage: {
        filename: String,
        filepath: String
    }, 
  
});

const DivImage = mongoose.model('divImage', divImageSchema);

module.exports = DivImage;
