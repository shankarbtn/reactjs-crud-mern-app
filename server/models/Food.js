const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true
    },
    foodType: {
        type: String,
        required: true
    }
});

const Food = mongoose.model('Food', FoodSchema);
module.exports = Food;