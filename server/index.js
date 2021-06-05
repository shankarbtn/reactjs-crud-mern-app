const express = require('express');
const mongoose = require('mongoose');
const app = express();
const FoodModel = require('./models/Food');

//accepts json input form client
app.use(express.json());

//DB connect
mongoose.connect('mongodb+srv://crud-app-user:HJXd5LbOi8pakU4f@cluster0.rj7gd.mongodb.net/crud-app?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> { console.log('MongonDB Server Connected');})
.catch((err) => { console.log(err) });

//Route
app.get('/', async (req, res) => {
    const foodData = new FoodModel({foodName: 'Noodles', foodType: 'Chinese'});
    try {
        await foodData.save();
        res.send('data inserted');
    } catch(err) {
        console.log(err);
    }
});

app.listen(3001, () => {
    console.log('Server is Running!!!');
});