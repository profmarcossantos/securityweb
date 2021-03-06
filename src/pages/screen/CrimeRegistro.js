import React, { useState } from 'react'
import {
    Button,
    Grid,
    Paper,
    TextField,
    Checkbox,
    MenuList,
    MenuItem,
}
    from '@material-ui/core';
import Firebase from '../../services/FirebaseConnect'
import { v4 as uuidv4 } from 'uuid';
import Geocode from "react-geocode";

export default function CrimeRegistro(props) {

    const [ocorrencia, setOcorrencia] = useState("")
    const [local, setLocal] = useState("")
    const [data, setData] = useState("")

    const limpar = () => {
        setOcorrencia("")
        setLocal("")
        setData("")
    }

    const salvarRegistro = () => {

        Geocode.setApiKey("AIzaSyDvdkyqaq8Cu2fVp_9EQNNnhMoDmT-GXt4");

        Geocode.fromAddress(local).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log(lat, lng);
                let objeto = {
                    ocorrencia: ocorrencia,
                    local: local,
                    data: data,
                    latitude: lat,
                    longitude: lng
                }
                let code = uuidv4()

                Firebase
                    .database()
                    .ref(`ocorrencias/${code}`)
                    .set(objeto)
                    .then(() => {
                        limpar()
                    })
                    .catch((erro) => {
                        console.log(erro)
                    })

            },
            error => {
                console.error(error);
            }
        );

    }

    return (
        <Grid container spacing={1} >
            <Grid item sm={10} xs={12}>
                <TextField
                    label="Ocorrencia"
                    variant="outlined"
                    value={ocorrencia}
                    onChange={(e) => setOcorrencia(e.target.value)}
                    size="small"
                    type="email"
                    style={{ width: "100%", marginBottom: 10 }} />
                <TextField
                    value={local}
                    onChange={(e) => setLocal(e.target.value)}
                    label="Local"
                    variant="outlined"
                    size="small"
                    type="email"
                    style={{ width: "100%", marginBottom: 10 }} />
                <TextField
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    label="Data e Hora"
                    variant="outlined"
                    size="small"
                    type="email"
                    style={{ width: "100%", marginBottom: 10 }} />
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={salvarRegistro}
                    style={{ float: "right" }}>
                    Enviar Dados
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => props.setScreen(1)}
                    style={{ float: "right" }}>
                    Cancelar
                </Button>
            </Grid>
        </Grid >

    )
}
