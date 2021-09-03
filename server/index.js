const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const FoodModel = require('./models/Food');

const app = express();

//accepts json input form client
app.use(express.json());
app.use(cors());

//DB connect
const uri = 'mongodb+srv://crud-app-user:LqPJ9I1KPj6cl2r7@cluster0.rj7gd.mongodb.net/Food?retryWrites=true&w=majority';
mongoose.connect(uri, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                })
const db = mongoose.connection;
db.once('open', () => console.log('MongoDB Server Connected Successfully'));
db.on('error', (e) => console.log('MongoDB Server Error'+ e));

// .then(() => { console.log('MongoDB Server Connected');})
// .catch((err) => { 
//     console.error('App starting error:', err.stack);
//     process.exit(1);
// });

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
    try {
        await FoodModel.find({}, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                console.log(result);
                res.send(result);
            }
        });
        // .sort({
        //     dateAdded: -1 //Sort by DESC
        // });
        res.send('data retreived successfully');
    } catch(err) {
        console.log(err);
    }
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