const express = require("express");
const app = express();
const userRoute = require("./routes/user.route.js");
const authRoute = require("./routes/authentication.route.js");
const eventRoute = require("./routes/event.route.js");
const adminRoute = require("./routes/admin.route.js");

const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./.env" });
const cors = require("cors");

PORT = process.env.API_PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3001" }));

app.use("/api", userRoute);
app.use("/api", authRoute);
app.use("/api", eventRoute);
app.use("/api/admin", adminRoute);

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
