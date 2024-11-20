const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userController = require('./controllers/userController');
const employeeController = require('./controllers/employeeController');
const PORT = process.env.PORT || 8081

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/user', userController);
app.use('/api/v1/emp', employeeController);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB Connection Error', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

