//goal: get all published course, 15$ more and have word in their name
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
.then(result => console.log('Connect successfully to database'))
.catch(err => console.log('Can not connect to database due to ' + err))

const CourseSchema = new mongoose.Schema({
    tags: [String],
    data: {type: Date, default: Date.now},
    name: String,
    author: String,
    price: Number,
    isPublished: Boolean,
})

const Course = mongoose.model('Course', CourseSchema);

const getDocument = async () => {
    const courseDoc = await Course
    .find({isPublished: true})
    .or([{price: {$gte: 15}}, {name: /.*by.*/}])
    .select({name: 1, author: 1, price: 1})   
    .lean();
    console.log(courseDoc);
}

getDocument()

