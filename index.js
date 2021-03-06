const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const mongoose = require("mongoose");
const Todo = require("./models/todo");
const PORT = 3000;

// const dbUrl = "mongodb://localhost:27017/tododb";
const dbUrl =
	"mongodb+srv://admin:12345@cluster0.ykrfi.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const tasksRouter = require("./routes/task");

app.use("/", tasksRouter);

app.listen(process.env.PORT || PORT, () =>
	console.log(`Application running on port ${PORT}: http://localhost:3000`)
);
