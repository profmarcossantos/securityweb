import React, { useState, useLayoutEffect } from 'react'
import {
    Button,
    Grid,
    Paper,
}
    from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Firebase from '../../services/FirebaseConnect'

export default function CrimeLista(props) {

    const [lista, setLista] = useState([])

    useLayoutEffect(() => {


        Firebase
            .database()
            .ref(`/ocorrencias`)
            .on('value', snapchot => {
                // converter objetos em listas
                let dados = snapchot.val()
                const keys = Object.keys(dados)
                const lista = keys.map((key) => {
                    return { ...dados[key], id: key }
                })
                setLista(lista)
                console.log(lista)
            })

    }, [])


    return (
        <Grid container spacing={1} >
            <Grid item sm={12} xs={12}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Ocorrencia</TableCell>
                                <TableCell align="right">Local</TableCell>
                                <TableCell align="right">Data</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lista.map((item, key) => {
                                return <TableRow key={key}>
                                    <TableCell component="th" scope="row">
                                        {item.ocorrencia}
                                    </TableCell>
                                    <TableCell align="right">{item.local}</TableCell>
                                    <TableCell align="right">{item.data}</TableCell>
                                </TableRow>
                            }
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item sm={12} xs={12}>
                <Button
                    variant="contained"
                    onClick={() => props.setScreen(2)}
                    color="primary"
                    startIcon={<AddCircleIcon />}>
                    Novo Registro
                    </Button>

            </Grid>


        </Grid>
    )
}
