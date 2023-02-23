import React, { useContext } from 'react';
import { CredentialsContext } from "../App";
import { Typography, makeStyles, Card, Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        width: 460,
        backgroundColor: "#1e4485",
        marginBottom: 5,
    },
    title: {
        fontSize: 30,
        color: "white"
    },
}));
export default function Header() {
    const [credentials, setCredentials] = useContext(CredentialsContext);
    const classes = useStyles();
    const logout = () => {
        setCredentials(null);
    }

    return (
        <div >
            <Card className={classes.root}>
                <Typography variant="h4" component="h1" align='center' className={classes.title}>
                    TO-DO APPLICATION
                </Typography>
                <Typography variant="h6" component="h3" align='center' className={classes.title}>
                    Welcome {credentials && credentials.userName}
                </Typography>
                {credentials &&
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={logout}>
                        Logout
                    </Button>
                }
            </Card>
        </div>
    );
}
