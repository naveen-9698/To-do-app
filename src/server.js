const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');

const app = express();
const port = 4000;
//connection to mongodb
mongoose.connect('mongodb://localhost:27017/todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//create the user schema which stores the details of users and create a user model
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    emailAddress: String,
    password: String,
});
const User = mongoose.model("User", userSchema);

//First, we create a todoschema to store information of a single todo item, we call this document as a subdocument in todoSchema/
//This approach can be useful later during insertion,updation and deletion.

const singleTodoSchema = new mongoose.Schema({
    completed: Boolean,
    text: String,
});
const todoSchema = new mongoose.Schema({
    userId: mongoose.Schema.ObjectId,
    todos: [
        singleTodoSchema
    ],
});
const Todos = mongoose.model("Todos", todoSchema);


app.use(cors());
app.use(express.json());

// api to receive the post request for creating a new user. Creates a new user and stores it in the User model.
app.post("/signup", async (req, res) => {
    //const userDetails = req.body;
    //const user = new User(userDetails);
    const { firstName, lastName, userName, emailAddress, password } = req.body;
    const user = await User.findOne({ userName }).exec();
    const email = await User.findOne({ emailAddress }).exec();
    if (user || email) {
        res.status(500);
        res.json({
            message: "user already exists try a new user",
        });
        return;
    }
    await User.create({ firstName, lastName, userName, emailAddress, password });
    // console.log(firstName);
    //console.log(emailAddress);
    res.json({
        message: 'success',
    });
});

//api to receive the post request for user log in. Checks the information received with the information on the User model document. 
app.post("/signin", async (req, res) => {
    const { userName, password } = req.body;
    //console.log(userName);
    const user = await User.findOne({ userName }).exec();
    if (!user || user.password !== password) {
        res.status(403);
        res.json({
            message: 'invalid login',
        });
        return;
    }
    res.json(
        {
            message: "success",
        }
    );
});

// api to add new todo items to the Todos model.
app.post("/todo", async (req, res) => {
    const { authorization } = req.headers;
    const todosItems = req.body;
    const [, token] = authorization.split(" ");
    const [userName, password] = token.split(":");
    const user = await User.findOne({ userName }).exec();
    if (!user || user.password !== password) {
        res.status(403);
        res.json({
            message: 'invalid access',
        });
        return;
    }

    const todos = await Todos.findOne({ userId: user._id });

    if (!todos) {
        await Todos.create({
            userId: user._id,
            todos: todosItems,
        });
    }
    else {
        todos.todos = todosItems;
        await todos.save();
    }
    res.json(
        {
            message: "success",
        });
});


// api to retrieve the stored todo items and send it to the front-end.
app.get("/todo", async (req, res) => {
    const { authorization } = req.headers;

    const [, token] = authorization.split(" ");
    const [userName, password] = token.split(":");
    const user = await User.findOne({ userName }).exec();
    if (!user || user.password !== password) {
        res.status(403);
        res.json({
            message: 'invalid access',
        });
        return;
    }

    const { todos } = await Todos.findOne({ userId: user._id });
    res.json(todos);
});

// api to delete a particular todo of a particular user.
app.delete("/todo", (async (req, res) => {
    const { authorization } = req.headers;
    const { id } = req.body;
    const [, token] = authorization.split(" ");
    const [userName, password] = token.split(":");
    const user = await User.findOne({ userName }).exec();
    if (!user || user.password !== password) {
        res.status(403);
        res.json({
            message: 'invalid access',
        });
        return;
    }
    try {
        const todo = await Todos.findOne({ userId: user._id }).exec();
        if (todo.todos) {
            await todo.todos.id(id).remove();
            todo.save(function (err) {
                if (err) {
                    res.status(403);
                    res.json(err);
                    throw Error(err);
                }
                console.log("sub doc deleted");
                res.json({
                    message: "data deleted"
                })
            })
        }
        else {
            throw Error("INvalid");
        }
    }
    catch (error) {
        console.log(error);
        res.json(error);
        throw Error(error);
    }
}));

//setting up of rest api web server
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    app.listen(port, () => {
        console.log("Example app is listening at http://localhost:4000");
    });
});