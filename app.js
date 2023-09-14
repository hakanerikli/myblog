const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');
const date = require(__dirname + "/date.js")
const workItems = [];
const items = [];

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://dataAdmin:YxRKT2006-@sweden1.ap8jijh.mongodb.net/?retryWrites=true&w=majority');
  // await mongoose.connect('mongodb://127.0.0.1:27017/todoList');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled


  const todoSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    }
  });

  const Todo = mongoose.model("Todo", todoSchema);

  // const todo = new Todo({
  //     name: item
  // })

  // todo.save();


  const data = await Todo.find({});
  console.log(data)
  // data.forEach(e => {
  //    console.log(e.name)
  // });
data.forEach(e => {
    items.push(e.name)
 });
  



app.set('view engine', "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  let day = date.getDate();
  res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work")
  } else {
    items.push(item);
    const todo = new Todo({
      name: item
    })
    todo.save();
    // mongoose.disconnect();
    res.redirect("/");
  }


})

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems })

})

app.get("/about", function (req, res) {
  res.render("about");

})


app.listen(3000, function () {
  console.log("Server is running on port 3000.");
})

}
