import { Grid } from "@material-ui/core";
import { React, useContext } from "react";
import { CredentialsContext } from "../App";
import Todo from "../components/Todo";
import IndexContainer from "../containers";
import Header from "./Header";
import '../App.css';
const Welcome = () => {
    const [credentials] = useContext(CredentialsContext);

    return (
        <Grid align='center' className="app-container">
            <Header />
            {!credentials && <IndexContainer />}
            {credentials && <Todo />}
        </Grid>
    );
}

export default Welcome;