const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('Connected to mongoDB'))
.catch((err) => console.log('Can not connect to mongoD ', err)) 

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
})
console.log(courseSchema)