const mongoose = require("mongoose")

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((res) => console.log("Database Connected Successfully"))
  .catch((err) => console.log("Error occured trying to connect: ", err));

