


const mongoose = require('mongoose');


const claddingSchema = new mongoose.Schema({
    title: String,
    mainParagraph: [String],
    subHead1: String,
    subHead2: String,
    paraSub1: String,
    paraSub2: String,
    claddingImage: {
        filename: String,
        url: String
    }, 
    claddingImage1: {
        filename: String,
        url: String
    },
    claddingImage2: {
        filename: String,
        url: String
    }
  
});

const Cladding = mongoose.model('Cladding', claddingSchema);

module.exports = Cladding;
