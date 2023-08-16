const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('Connected to mongoDB'))
.catch((err) => console.log('Can not connect to mongoD ', err)) 

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number,
    tags: [String],
    date: {type: Date, default: Date.now},
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

const updateDocument = async (id) => {
    const course = await Course.findById(id);

    if (!course) return;

    course.author = 'Robert';
    course.name = 'Advanced Nodejs';
    const result = await course.save();
    console.log(result);
}

updateDocument("64d70d2ac40d8a35908fafcb");