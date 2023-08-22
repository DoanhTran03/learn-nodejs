const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(() => {console.log('Connected to database')})
.catch((err) => console.log(err));

const Author = mongoose.model('author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String
}))

const Course = mongoose.model('course', new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}))

const createAuthor = async (name, bio, website) => {
    const authorDoc =  new Author ({
        name: name,
        bio: bio,
        websit: website
    })
    const result = await authorDoc.save();
    console.log(result);
}

const createCourse = async (name, authorId) => {
    const courseDoc = new Course ({
        name: name,
        author: authorId
    });
    const result = await courseDoc.save();
    console.log(result);
}

const getCoures = async () => {
    const result = await Course.find({}).lean();
    console.log(result);
}

getCoures();