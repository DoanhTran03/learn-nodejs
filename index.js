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
    const courses = await Course

    // Start with Mosh
    .find({author: /^Mosh/})

    // End with Mosh 
    .find({author: /Mosh$/})

    // Contains Mosh
    .find({author: /.*Mosh.*/})

    .or([{author: 'Mosh'}, {isPublished: true}])
    .and([{}])
    .limit(10)
    .sort({name: 1})
    .select({name: 1, tags: 1, author: 1})
    .lean()
    .count();
    console.log(courses);
}

getDocument()