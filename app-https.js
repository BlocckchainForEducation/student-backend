const express = require("express");
const app = express();
const https = require("https");
var fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const axios = require("axios").default;
axios.defaults.baseURL = process.env.STUDENT_API_PROVIDER;

const cors = require("cors");
app.use(cors());

app.use("/acc", require("./routes/acc/acc-mng-router"));
app.use("/student", require("./routes/student-router"));

const PORT = process.env.PORT || 8000;

https
  .createServer(
    {
      key: fs.readFileSync("/etc/letsencrypt/live/student-backend.b4e.vn/privkey.pem"), // need bind mount
      cert: fs.readFileSync("/etc/letsencrypt/live/student-backend.b4e.vn/fullchain.pem"), // need bind mount
    },
    app
  )
  .listen(PORT, () => {
    console.log(`B4E Student Backend listening on port ${PORT}!`);
  });
