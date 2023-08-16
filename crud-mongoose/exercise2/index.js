//goal: get all published frontend and backend course, sort by price in descending order, pick name and author
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
    .or([{tags: 'frontend'}, {tags: 'backend'}])
    .sort({price: -1})
    .select({name: 1, author: 1, price: 1})   
    .lean();
    console.log(courseDoc);
}

getDocument()

