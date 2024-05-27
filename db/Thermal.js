


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
        filepath: String
    }, 
    thermalImage1: {
        filename: String,
        filepath: String
    },
    thermalImage2: {
        filename: String,
        filepath: String
    }
  
});

const Thermal = mongoose.model('Thermal', thermalSchema);

module.exports = Thermal;
