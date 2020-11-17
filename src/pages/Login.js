import React, { useState, useLayoutEffect } from 'react'

import {
    Button,
    Grid,
    Paper,
    TextField,
    Checkbox
}
    from '@material-ui/core';

import Firebase from '../services/FirebaseConnect'
import { useHistory } from "react-router-dom";

function Login() {
    let history = useHistory();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [msg, setMsg] = useState("")
    const [lembreme, setLembreme] = useState(false)


    useLayoutEffect(() => {

        let emailStorage = localStorage.getItem("email")
        let passwordStorage = localStorage.getItem("password")
        if (emailStorage && passwordStorage) {
            setEmail(emailStorage)
            setPassword(passwordStorage)
            setLembreme(true)
        }

    }, [])


    const login = () => {

        if (lembreme == false) {
            localStorage.removeItem("email")
            localStorage.removeItem("password")
        }

        Firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((retorno) => {
                sessionStorage.setItem("uuid", retorno.user.uid)
                if (lembreme === true) {
                    localStorage.setItem("email", email)
                    localStorage.setItem("password", password)
                }
                setMsg("")
                history.push("/menu");

            })
            .catch((erro) => {
                console.log(erro)
                setMsg("Usuário ou senha inválidos!")
            })
    }
    return (
        <div>
            <Grid container spacing={1}>
                <Grid item sm={8} xs={12}>

                </Grid>
                <Grid item sm={4} xs={12}>
                    <Paper elevation={0}>
                        <TextField
                            label="E-mail"
                            variant="outlined"
                            size="small"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: "100%", marginBottom: 10 }} />
                        <TextField
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Senha"
                            variant="outlined"
                            type="password"
                            size="small"
                            style={{ width: "100%", marginBottom: 10 }} />
                        <Grid item sm={12} xs={12} style={{ textAlign: "center" }}>
                            <Checkbox
                                checked={lembreme}
                                onChange={(e) => setLembreme(e.target.checked)}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            /> Lembre-me
            </Grid>
                        <Grid item sm={12} xs={12} style={{ textAlign: "center", color: "red", marginBottom: 5, fontSize: 12 }}>
                            {msg}
                        </Grid>
                        <Button
                            onClick={login}
                            variant="outlined"
                            color="primary"
                            style={{ float: "right" }}>
                            Entrar
            </Button>
                    </Paper>
                </Grid>

            </Grid>
        </div>
    );
}

export default Login;
