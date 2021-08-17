const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('tiny'));
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  
if (process.env.NODE_ENV === "production") {
    // Serve production assets for front end
    app.use(express.static("client/build"));
  
    // Serve index.html if route unrecognized
    const path = require("path");
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }

//initialize models needed
require("./models/user");
require("./models/appointment");
require("./models/hairStyle");
require("./models/token");
//initialize database
require("./config/db");
//provide routes for users to navigate
require("./startup/routes")(app);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Server is running on port "+PORT);
  });