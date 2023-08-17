const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connect successfully to database"))
  .catch((err) => console.log("Can not connect to database due to " + err));

const courseSchema = mongoose.Schema({
  tags: {
    type: String,
    required: true
  },
  name: {
      type: String,
      minlength: 3,
      maxlength: 10,
      required: true,
    },
    price: {
        type: Number,
        min: 0,
        max: 100
    },
    date: { type: Date, default: Date.now() },
  author: String,
  isPublish: Boolean,
});

const Course = mongoose.model("course", courseSchema);

const createDocument = async () => {
  const course = Course({
    tags: ["test"],
    name: "Test",
    author: "Cowboy",
    isPublish: true,
    price: 10,
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
createDocument();
