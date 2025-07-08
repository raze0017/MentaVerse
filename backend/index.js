const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
const path = require("node:path");
const authRoutes = require("./routes/auth");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

require("dotenv").config();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/", authRoutes);
app.listen(PORT, () => {
  console.log("LIstening on port: ", PORT);
});
