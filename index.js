const express = require("express")
const app = express();



if(process.env.NODE_ENV !== 'production')
require("dotenv").config();


require("./config/db");

const PORT = process.env.PORT


app.listen(PORT, () => console.log("listentin on ", PORT));