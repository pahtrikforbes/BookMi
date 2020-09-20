const express = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");
const app = express();

require("./models/user");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

require("./config/db");
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
require("./utils/passport-google");
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // Serve production assets for front end
  app.use(express.static("client/build"));

  // Serve index.html if route unrecognized
  const path = require("path");

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT;

app.listen(PORT, () => console.log("listening on", PORT));
