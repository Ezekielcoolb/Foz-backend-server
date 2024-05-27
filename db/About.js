


const mongoose = require('mongoose');


const aboutSchema = new mongoose.Schema({
    mainPara: [String],
    dream: [String],
    vision: [String],
    mission: [String],
    aboutImage: {
        filename: String,
        filepath: String
    }
});

const About = mongoose.model('About', aboutSchema);

module.exports = About;
