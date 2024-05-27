


const mongoose = require('mongoose');


const roofingSchema = new mongoose.Schema({
    title: String,
    mainParagraph: [String],
    subHead1: String,
    subHead2: String,
    paraSub1: String,
    paraSub2: String,
    roofingImage: {
        filename: String,
        filepath: String
    }, 
    roofingImage1: {
        filename: String,
        filepath: String
    },
    roofingImage2: {
        filename: String,
        filepath: String
    }
  
});

const Roofing = mongoose.model('Roofing', roofingSchema);

module.exports = Roofing;
