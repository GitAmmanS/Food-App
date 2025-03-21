const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors=require('cors')
const path = require('path');
// Load environment variables from .env file

dotenv.config();

const userRoutes = require('./routes/userRoutes');
const productRoutes=require('./routes/productRoutes');
const categoryRoutes=require('./routes/categoryRoutes');
const orderRoutes=require('./routes/orderRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/category', categoryRoutes);
app.use('/order',orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
