


const mongoose = require('mongoose');


const newDivSchema = new mongoose.Schema({
    head: String,
    secPara: String,
});

const NewDiv = mongoose.model('newDiv', newDivSchema);

module.exports = NewDiv;
