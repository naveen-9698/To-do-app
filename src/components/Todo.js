import React, { useContext, useEffect, useState } from "react";
import { handleErrors } from "../pages/Signup";
import { CredentialsContext } from "../App";
import { Box, Button, Grid, Paper, TextField, } from "@material-ui/core";
import { todoPaperStyle, todoListStyle, completedStyle } from "./todoStyles";
import DeleteIcon from '@material-ui/icons/Delete';
const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [todoText, settodoText] = useState("");
    const [credentials] = useContext(CredentialsContext);
    const persist = (newTodos) => {
        fetch('http://localhost:4000/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${credentials.userName}:${credentials.password}`
            },
            body: JSON.stringify(newTodos),
        })
            .then(handleErrors)
            .then()
            .catch(function (error) {
                console.log(error);

            })
    };

    const deleteTodo = (id) => {

        const todoId = { id }
        fetch('http://localhost:4000/todo', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${credentials.userName}:${credentials.password}`
            },
            body: JSON.stringify(todoId),
        })
            .then(handleErrors)
            .then()
            .catch(function (error) {
                console.log(error);

            })

    };
    useEffect(() => {
        let mounted = true;
        fetch('http://localhost:4000/todo', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${credentials.userName}:${credentials.password}`
            },

        }).then((response) => response.json())
            .then(todos => {
                if (mounted) {
                    setTodos(todos)
                }
            });
        return () => mounted = false;

    }, [todos, credentials]);

    const addTodo = (e) => {
        e.preventDefault();
        if (!todoText) return;
        const newTodos = [...todos, { completed: false, text: todoText }]
        setTodos(newTodos);
        settodoText("");
        persist(newTodos);
    };
    const toggleTodo = (id) => {
        const newTodoList = [...todos];
        const todoItem = newTodoList.find(todo => todo._id === id);
        todoItem.completed = !todoItem.completed;
        setTodos(newTodoList);
        persist(newTodoList);
    };

    return (
        <Grid container
            justifyContent="center"

            direction="column">
            <Paper elevation={10} style={todoPaperStyle}>
                <form onSubmit={addTodo}>
                    <TextField
                        value={todoText}
                        onChange={(e) => settodoText(e.target.value)}
                        fullWidth
                        type="text" />
                    <Button
                        style={{ margin: "20px 0px" }}
                        variant="contained"
                        color="primary"
                        type="submit">Add new To-do</Button>

                    <br />
                    {todos.map((todo, id) => (
                        <Grid
                            container item
                            lg={12}
                            display="flex"
                            component="span"
                            key={todo._id}
                            style={todoListStyle.box}>
                            <Box order={1}
                                whiteSpace="normal"
                                component="span"
                                flexGrow={1}
                                style={completedStyle(todo.completed)}
                            >{todo.text}</Box>
                            <Box order={2} >
                                <Button
                                    variant="outlined"
                                    size="small"
                                    disabled={todo.completed}
                                    style={completedStyle(todo.completed)}
                                    onClick={() => toggleTodo(todo._id)}
                                >Complete</Button>
                            </Box>
                            <Box order={3}>
                                <Button
                                    onClick={() => deleteTodo(todo._id)}><DeleteIcon /></Button>
                            </Box>
                        </Grid>
                    ))}
                </form>
            </Paper>
        </Grid>
    );
};

export default Todo;