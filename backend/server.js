const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const colors = require("colors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 8000;

const app = express();

// connect to data base
connectDB();

app.get("/", (req, res) => {
  res.status(200).json({ message: "wellcome to the support desk api" });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", require("./routes/userRoutes"));

// error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
