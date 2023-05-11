const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const compression = require("compression")
const bodyParser = require("body-parser")
const cors = require("cors")
const routes = require("./routes/index")

const { getEnvironment } = require("./config/environment");

const app = express()
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan("tiny"))
app.use(cors())
app.options("*", cors())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "*")
  next()
})

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);
mongoose
  .connect(getEnvironment().DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 40000,
    family: 4,
  })
  .then(() => {
    console.log("Connected to the database successfully");
  })
  .catch((error) => console.error("Could not connect to database", error));

app.use("/api/v1/", routes);

app.get("/", (req, res, next) => {
  res.status(200).send("Rarities Web App API suite");
});

app.listen(getEnvironment().PORT, () => {
  console.log(`Backend app is listening on port ${getEnvironment().PORT} with environment ${getEnvironment().ENVIRONMENT}`);
});
