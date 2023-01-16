const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const uploadRoutes = require("./routes/uploadRoutes");
// const getBlogs = require("../controllers/uploadController");

const app = express();
app.use(cors());
dotenv.config();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/upload", uploadRoutes);
// app.use("/getBlogs", getBlogs);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port:${PORT}`));
