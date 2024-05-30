


const mongoose = require('mongoose');


const thermalSchema = new mongoose.Schema({
    title: String,
    mainParagraph: [String],
    subHead1: String,
    subHead2: String,
    paraSub1: String,
    paraSub2: String,
    thermalImage: {
        filename: String,
        url: String
    }, 
    thermalImage1: {
        filename: String,
        url: String
    },
    thermalImage2: {
        filename: String,
        url: String
    }
  
});

const Thermal = mongoose.model('Thermal', thermalSchema);

module.exports = Thermal;
