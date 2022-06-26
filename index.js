const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const mongoose = require("mongoose");
const Todo = require("./models/todo");
const port = 3000;

// const dbUrl = "mongodb://localhost:27017/tododb";
const dbUrl =
	"mongodb+srv://admin:12345@cluster0.ykrfi.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
	const searchRes = await Todo.find({}).then((result) => {
		res.render("index", { data: result });
		console.log(result);
	});
});

app.post("/", (req, res) => {
	const todo = new Todo({
		todo: req.body.todoValue,
	});

	todo.save().then((result) => {
		res.redirect("/");
	});
});
app.delete("/:id", async (req, res) => {
	Todo.findByIdAndDelete(req.params.id).then((result) => console.log(result));
});

app.listen(port, () =>
	console.log(`Application running on potra ${port}: http://localhost:3000`)
);
