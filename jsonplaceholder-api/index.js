const express = require("express");
const bodyParser = require("./lib/middleware/bodyParser");
const v1 = require("./routes/v1/routes");
const v2 = require("./routes/v2/routes")

const app = express();

app.use("/v1", v1);
// app.use("/v2", v2);

const port = 3000;
app.listen(port);
console.log("Now listening on port " + port);