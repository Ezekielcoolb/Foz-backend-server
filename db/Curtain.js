


const mongoose = require('mongoose');


const curtainSchema = new mongoose.Schema({
    title: String,
    mainParagraph: [String],
    subHead1: String,
    subHead2: String,
    paraSub1: String,
    paraSub2: String,
    curtainImage: {
        filename: String,
        url: String
    }, 
    curtainImage1: {
        filename: String,
        url: String
    },
    curtainImage2: {
        filename: String,
        url: String
    }
  
});

const Curtain = mongoose.model('Curtain', curtainSchema);

module.exports = Curtain;
