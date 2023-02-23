import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { handleErrors } from "./Signup";
import { CredentialsContext } from "../App";
import { Button, TextField, Grid, Paper, Avatar } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { paperStyle, elementStyle, avatarStyle } from "./styles";

const Signin = () => {
    const [userDetails, setuserDetails] = useState({
        userName: "",
        password: "",
    });
    const [, setCredentials] = useContext(CredentialsContext);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setuserDetails({
            ...userDetails,
            [name]: value
        });
    };
    const login = (e) => {
        e.preventDefault();
        let mounted = true;
        fetch('http://localhost:4000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(userDetails),
        })
            .then(handleErrors)
            .then(() => {
                let user = userDetails.userName;
                let pass = userDetails.password;
                setCredentials({
                    userName: user,
                    password: pass,
                });
                if (mounted) {
                    setuserDetails({
                        userName: "",
                        password: "",
                    });
                }
                history.push("/");
            })
            .catch(function (error) {
                console.log(error);

            })
        return () => mounted = false;
    };

    const history = useHistory();
    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /> </Avatar>
                    <h1>Sign In</h1>
                </Grid>
                <form onSubmit={login}>
                    <TextField
                        style={elementStyle}
                        variant="outlined"
                        type="text"
                        name="userName"
                        value={userDetails.userName}
                        onChange={handleChange}
                        label="User Name"
                        fullWidth
                        required />
                    <br />
                    <TextField
                        style={elementStyle}
                        variant="outlined"
                        type="password"
                        name="password"
                        value={userDetails.password}
                        onChange={handleChange}
                        label="Password"
                        fullWidth
                        required />
                    <br />
                    <Button
                        style={elementStyle}
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth>
                        Sign In</Button>
                </form>
            </Paper>
        </Grid>
    );
}
export default Signin;