const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connect successfully to database"))
  .catch((err) => console.log("Can not connect to database due to " + err));

const courseSchema = new mongoose.Schema({
  tags: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    maxlength: 10,
    required: true,
    validate: {
      validator: function(v) {
        return v && v.length > 3;
      },
      message: "A course name should have at least 3 characters"
    }
  },
  price: {
    type: Number,
    min: 0,
    max: 100,
  },
  date: { type: Date, default: Date.now() },
  author: String,
  isPublish: Boolean,
});

const Course = mongoose.model("course", courseSchema);

const createDocument = async () => {
  const course = Course({
    tags: ["test"],
    name: "Te",
    author: "Cowboy",
    isPublish: true,
    price: 200,
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    for( field in ex.errors) {
      console.log(ex.errors[field].message)
    }
  }
};
createDocument();
