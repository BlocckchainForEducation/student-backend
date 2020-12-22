const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const axios = require("axios").default;
axios.defaults.baseURL = process.env.REST_API_URL;

const cors = require("cors");
app.use(cors());

const accRouter = require("./routes/acc/acc-mng-router");
app.use("/acc", accRouter);

const studentRouter = require("./routes/student-router");
app.use("/student", studentRouter);

app.listen(8001, () => {
  console.log("App listening on port 8001!");
});
