const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` }); docker-compose will provide env_file
const axios = require("axios").default;
axios.defaults.baseURL = process.env.STUDENT_API_PROVIDER;

const cors = require("cors");
app.use(cors());

const accRouter = require("./routes/acc/acc-mng-router");
app.use("/acc", accRouter);

const studentRouter = require("./routes/student-router");
app.use("/student", studentRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
