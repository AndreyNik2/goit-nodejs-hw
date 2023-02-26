// CvKOhDmvkq3GvnbH
const app = require("./app");
const mongoose = require("mongoose");

const { DB_HOST, PORT = 3000 } = process.env;

// const DB_HOST =
//   "mongodb+srv://Andrii:CvKOhDmvkq3GvnbH@cluster0.uh6nglu.mongodb.net/contactbook?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(app.listen(PORT))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
