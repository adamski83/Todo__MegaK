const express = require("express");
const Todo = require("../models/todo");
const router = express.Router();

router.get("/", async (req, res) => {
	const searchRes = await Todo.find({}).then((result) => {
		res.render("index", { data: result });
		console.log(result);
	});
});

router.post("/", async (req, res) => {
	const todo = new Todo({
		todo: req.body.todoValue,
	});

	await todo.save();
	res.redirect("/");
});
router.delete("/:id", async (req, res) => {
	Todo.findByIdAndDelete(req.params.id).then((result) => console.log(result));
});

module.exports = router;
