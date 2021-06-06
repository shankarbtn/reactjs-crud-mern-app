const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const FoodModel = require('./models/Food');

//accepts json input form client
app.use(express.json());
app.use(cors());

//DB connect
mongoose.connect('mongodb+srv://crud-app-user:HJXd5LbOi8pakU4f@cluster0.rj7gd.mongodb.net/crud-app?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => { console.log('MongoDB Server Connected');})
.catch((err) => { console.log(err) });

//Route
app.post('/insert', async (req, res) => {
    const inputFoodName = req.body.foodName;
    const inputFoodType = req.body.foodType;
    const inputDate = req.body.dateAdded;

    const foodData = new FoodModel({foodName: inputFoodName, foodType: inputFoodType, dateAdded: inputDate});

    try {
        await foodData.save();
        res.send('data inserted successfully');
    } catch(err) {
        console.log(err);
    }
});

app.get('/read', async (req, res) => {
    await FoodModel.find({}, (err, result) => {
        if(err) {
            res.send(err);
        }
        
        res.send(result);
    })
    .sort({
        dateAdded: -1 //Sort by DESC
    });
});

app.put('/update', async (req, res) => {
    const newFoodName = req.body.newFoodName;
    const newFoodType = req.body.newFoodType;
    const id = req.body.updateId;
    try {
        await FoodModel.findById(id, (err, updatedItem) => {
            updatedItem.foodName = newFoodName;
            updatedItem.foodType = newFoodType;
            updatedItem.save();
            res.send('Item updated successfully');
        });
    } catch(err) {
        console.log(err);
    }
    
});

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    //await FoodModel.findByIdAndRemove(id).exec();
    res.send('Item deleted successfully');
});

app.listen(3001, () => {
    console.log('Server is Running!!!');
});