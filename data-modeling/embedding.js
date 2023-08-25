const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(() => {console.log('Connected to database')})
.catch((err) => console.log(err));

const authorSchema = new mongoose.Schema (
    {
        name: String,
        bio: String,
        website: String
    }
)

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: authorSchema
}))

const createCourse = async (name, author) => {
    const courseDoc = new Course ({
        name: name,
        author: author
    });
    const result = await courseDoc.save();
    console.log(result);
}

const updateAuthor = async (id) => {
    const course = await Course.findById(id);
    course.author.name = "Updated";
    const result = await course.save();
    console.log(result);
}

const deleteAuthor = async (id) => {
    const result = await Course.update({_id: id}, {$unset: {author : ''}})
    console.log(result);
}

const getCoures = async () => {
    const result = await Course.find({})
    .lean()
    console.log(result);
}

// createCourse('JavaScript foundation version 2', new Author({name: "Robert", bio: "Unknown", website: "www.robert.com"}));
// updateAuthor('64e4e083915de20c84c270fa');
deleteAuthor("64e4e3cf176327297482d6af")