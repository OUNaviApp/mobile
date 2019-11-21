import React, { useState, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import axios from "axios";
import { API_URL } from "../api/config";
import { useLocalStorage } from "../hooks/useLocalStorage";

const useStyles = makeStyles({
    card: {
        minWidth: 275,
        maxWidth: 750,
        margin: "auto",
        marginTop: 50
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)"
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    }
});

export const Login = () => {
    const classes = useStyles();

    const [type, setType] = useState("LOGIN");

    const [phone, setPhone] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [verificationToken, setVerificationToken] = useState("");
    const [authToken, setAuthToken] = useLocalStorage(
        "authentication_token",
        undefined
    );

    const createAccount = async () => {
        const res = await axios.post(
            API_URL + "account/create_account_request",
            {
                phone,
                firstName,
                lastName
            }
        );
        setVerificationToken(res.data);
        setType("VERIFICATION_ACCOUNT");
    };

    const login = async () => {
        const res = await axios.post(API_URL + "account/login_request", {
            phone
        });
        setVerificationToken(res.data);
        setType("VERIFICATION_LOGIN");
    };

    const verifyLogin = async () => {
        const res = await axios.post(API_URL + "account/login_confirm", {
            token: verificationToken,
            code: verificationCode
        });
        setAuthToken(res.data);
    };

    const verifyAccount = async () => {
        const res = await axios.post(
            API_URL + "account/create_account_confirm",
            {
                token: verificationToken,
                code: verificationCode
            }
        );
        setAuthToken(res.data);
    };

    if (type === "VERIFICATION_ACCOUNT") {
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Enter the code that was texted to you!
                    </Typography>
                    <TextField
                        label="Verification Code"
                        margin="normal"
                        value={verificationCode}
                        onChange={e => setVerificationCode(e.target.value)}
                    />
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={verifyAccount}>
                        Continue
                    </Button>
                </CardActions>
            </Card>
        );
    }

    if (type === "VERIFICATION_LOGIN") {
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Enter the code that was texted to you!
                    </Typography>
                    <TextField
                        label="Verification Code"
                        margin="normal"
                        value={verificationCode}
                        onChange={e => setVerificationCode(e.target.value)}
                    />
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={verifyLogin}>
                        Continue
                    </Button>
                </CardActions>
            </Card>
        );
    }

    if (type === "LOGIN") {
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Welcome!
                    </Typography>
                    <div>
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => setType("CREATE_ACCOUNT")}
                        >
                            Don't have an account? Click here!
                        </Link>
                    </div>
                    <TextField
                        label="Phone Number"
                        margin="normal"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={login}>
                        Login
                    </Button>
                </CardActions>
            </Card>
        );
    }

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Welcome!
                </Typography>
                <div>
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => setType("LOGIN")}
                    >
                        Already have an account? Click here!
                    </Link>
                </div>
                <div>
                    <TextField
                        label="Phone Number"
                        margin="normal"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        label="First Name"
                        margin="normal"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        label="Last Name"
                        margin="normal"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={createAccount}>
                    Create Account
                </Button>
            </CardActions>
        </Card>
    );
};
