const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;
const app = express();
const { errorHandler } = require("./middleware/errorMiddleware");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "wellcome to the support desk api" });
});

// Routes
app.use("/api/users", require("./routes/userRoutes"));
// error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
