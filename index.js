const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('Connected to mongoDB'))
.catch((err) => console.log('Can not connect to mongoD ', err))