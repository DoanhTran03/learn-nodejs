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

const Course = mongoose.model('Course', courseSchema);
const createDocument = async () => {
    const course = new Course({
        name: 'Basic MongoDB',
        author: 'Mosh',
        tags: ['mongodb', 'education'],
        isPublished: true
    });
    const result = await course.save();
    console.log(result);
}

const getDocument = async () => {
    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
    .find({})
    .skip((pageNumber -1) * pageSize)       
    .limit(10)
    .lean()
    .count();
    console.log(courses);
}

getDocument()