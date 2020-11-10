import React, { useState } from 'react'

import {
  Button,
  Grid,
  Paper,
  TextField,
}
  from '@material-ui/core';

import Firebase from './services/FirebaseConnect'

function App() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = () => {

    Firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((retorno) => {
        console.log("Usuário Logado: " + retorno.user.uid)
      })
      .catch((erro) => {
        console.log(erro)
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

export default App;
