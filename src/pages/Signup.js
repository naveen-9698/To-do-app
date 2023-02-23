import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { CredentialsContext } from "../App";
import { Avatar, Button, Grid, Paper, TextField } from "@material-ui/core";
import { paperStyle, elementStyle, avatarStyle } from "./styles";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

export const handleErrors = async (response) => {
    if (!response.ok) {
        const message = await response.json();
        document.getElementById('error').innerHTML = message.message;
        //console.log("message", message);
        throw Error(message);
    }
    return response.json();
};
const Signup = () => {
    const [userDetails, setuserDetails] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        emailAddress: "",
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
    const add = (e) => {
        e.preventDefault();

        fetch('http://localhost:4000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(userDetails)
        })
            .then(handleErrors)
            .then(() => {
                let user = userDetails.userName;
                let pass = userDetails.password;
                setCredentials({
                    userName: user,
                    password: pass,
                });
                setuserDetails({
                    firstName: "",
                    lastName: "",
                    userName: "",
                    emailAddress: "",
                    password: "",
                });
                history.push("/");
            })
            .catch(function (error) {
                console.log(error);

            })
    };
    const history = useHistory();
    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><AddCircleOutlineOutlinedIcon /></Avatar>
                    <h1>Sign Up</h1>
                    <h3 id="error" style={{ color: 'red' }}></h3>
                </Grid>
                <Grid>
                    <form onSubmit={add}>
                        <Grid container>
                            <Grid item xs={6}>
                                <TextField
                                    style={elementStyle}
                                    variant="outlined"
                                    type="text"
                                    name="firstName"
                                    value={userDetails.firstName}
                                    label="First Name"
                                    onChange={handleChange}
                                    required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    style={elementStyle}
                                    variant="outlined"
                                    type="text"
                                    name="lastName"
                                    value={userDetails.lastName}
                                    onChange={handleChange}
                                    label="Last Name"
                                    required />
                            </Grid>
                        </Grid>
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
                            type="email"
                            name="emailAddress"
                            value={userDetails.emailAddress}
                            label="Email"
                            onChange={handleChange}
                            fullWidth
                            required />
                        <br />
                        <TextField
                            style={elementStyle}
                            variant="outlined"
                            type="password"
                            name="password"
                            value={userDetails.password}
                            label="Password"
                            onChange={handleChange}
                            fullWidth
                            required />
                        <br />
                        <Button
                            style={elementStyle}
                            size="large"
                            variant="contained"
                            color="primary"
                            fullWidth
                            type="submit">Get Started</Button>
                    </form>
                </Grid>
            </Paper>
        </Grid>
    );

}
/*
class Signup extends React.Component {
    state = {
        firstName:"",
        lastName:"",
        userName:"",
        emailAddress:"",
        password:""
    };

    add = (e) =>{
        e.preventDefault();
        
        fetch('http://localhost:4000/signup',{
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: JSON.stringify(this.state)
        })
        .then( async function(response){
                if (!response.ok) {
                    const message = await response.json();
                    document.getElementById('error').innerHTML = message.message;
                    //console.log("message", message);
                    throw Error(message);
                }
                return response.json();
            })
        .then( () =>{
            console.log("We are here!!");
            this.props.history.push("/");
        })
        .catch(function(error){
            console.log(error);
            
        });
        
       
       this.setState({
            firstName:"",
            lastName:"",
            userName:"",
            emailAddress:"",
            password:""

        });
        //console.log(this.state);
    }
    render(){
        return (
            <div>
            <h1 style={{textAlign:"center"}}>Sign Up</h1>
            <h3 id="error" style={{color:'red'}}></h3>
            <form onSubmit={this.add}>
                <input 
                    type="text" 
                    name ="firstName" 
                    placeholder="First Name *" 
                    onChange = {(e) => this.setState({firstName:e.target.value})}
                    required />
                <input 
                    type="text" 
                    name ="lastName" 
                    onChange = {(e) => this.setState({lastName:e.target.value})}
                    placeholder="Last Name *" 
                    required />
                <br />
                <input 
                    type="text" 
                    name ="userName" 
                    onChange = {(e) => this.setState({userName:e.target.value})}
                    placeholder="User Name *" 
                    required />
                <br />
                <input 
                    type="email" 
                    name ="emailAddress" 
                    placeholder="Email Address *" 
                    onChange = {(e) => this.setState({emailAddress:e.target.value})}
                    required />
                <br />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Set a Password *" 
                    onChange = {(e) => this.setState({password:e.target.value})}
                    required />
                <br />
                <button type="submit">Get Started</button>
            </form>
        </div>
        );
    }
}*/

export default Signup;