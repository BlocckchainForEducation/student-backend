const express = require("express");
const app = express();
const https = require("https");
var fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const axios = require("axios").default;
axios.defaults.baseURL = process.env.REST_API_URL;

const cors = require("cors");
app.use(cors());

app.use("/acc", require("./routes/acc/acc-mng-router"));
app.use("/student", require("./routes/student-router"));

const PORT = process.env.PORT || 8002;

https
  .createServer(
    {
      key: fs.readFileSync("/etc/letsencrypt/live/student-backend.b4e.vn/privkey.pem"),
      cert: fs.readFileSync("/etc/letsencrypt/live/student-backend.b4e.vn/fullchain.pem"),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`B4E Student Backend listening on port ${PORT}!`);
  });
