import { useHistory } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Link, Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Grid, Typography } from '@material-ui/core';
import ProcessAPI from "../services/process";
import moment from 'moment';



export default function FormWindow(props) {
    const { isHome,
        processes,
        setProcesses,
        openModal,
        setOpenModal,
        process,
        setProcess,
        setViewProcess,
        interested,
        setInterested,
        setOpenMessage,
        setMessageText
    } = props;

    const [interest, setInterest] = useState({})
    const history = useHistory();

    useEffect(() => {
        setProcess({ ...process, interessados: interested })
    }, [interested]);

    const handleClickOpen = () => {
        setOpenModal(true);
        setProcess({ assunto: "", descricao: "", data: moment().format('YYYY-MM-DD'), numero: "SOFT 0001/2018" })
        setInterested([])

    };
    const handleClose = () => {
        setOpenModal(false);
    };

    const handleChangeInterest = (event) => {
        const { value, name } = event.target
        setInterest({ ...interest, [name]: value })
    };

    const handleAddToInterested = () => {
        setInterested([
            ...interested,
            {
                id: Math.random().toString(36).substr(2, 9),
                ...interest,
            }
        ])
    }

    const handleChange = (event) => {
        const { value, name } = event.target
        setProcess({ ...process, [name]: value })
    };

    const sendProcess = () => {

        const existProcess = processes.some(item => item.id === process.id)

        if (existProcess) {
            const result = processes.map(item => {
                if (item.id === process.id) {
                    return process
                }
                else {
                    return item
                }
            })
            setProcesses(result)
            setViewProcess({
                id: process.id,
                numero: process.numero,
                assunto: process.assunto,
                data: process.data,
                interessados: interested,
                descricao: process.descricao
            })
            ProcessAPI.updateProcess(process, process.id)
            setMessageText("Editado com sucesso!")
            setOpenMessage(true)
        } else {
            setProcesses([
                ...processes,
                {
                    id: Math.random().toString(36).substr(2, 9),
                    interessados: interested,
                    ...process,
                }
            ])
            ProcessAPI.insertProcess(process)
            setMessageText("Cadastrado com sucesso!")
            setOpenMessage(true)
            setProcess({ id: 0, assunto: "", data: "", interessados: [], descricao: "" });
            setInterested([])

        }
        setOpenModal(false)
        history.push("/processos");

    }

    const handleSubmitProcess = (e) => {
        e.preventDefault()
        if (interested.length > 0) {
            sendProcess()
        }
    }

    return (
        <>
            {isHome ? <Box mt={2}> <Typography style={{ fontSize: '16px' }}> Voce pode criar um novo processo <Link href="#" onClick={handleClickOpen}> clicando aqui </Link></Typography></Box>
                : <Box ml={2}>
                    <Button
                        onClick={handleClickOpen}
                        variant="contained"
                        style={{ fontSize: '14px' }}
                    >Novo
                    </Button>
                </Box>
            }

            <Box>
                <Dialog fullWidth open={openModal} onClose={handleClose} aria-labelledby="form-dialog-title">

                    <DialogTitle id="form-dialog-title">Cadastro de Processo</DialogTitle>
                    <form onSubmit={handleSubmitProcess}>
                        <DialogContent>
                            <Grid container spacing={2} direction="column">
                                <Grid item xs={12}>
                                    <TextField
                                        autoFocus
                                        required
                                        id="assunto"
                                        label="Assunto"
                                        margin="dense"
                                        type="text"
                                        fullWidth
                                        name="assunto"
                                        value={process.assunto}
                                        onChange={handleChange}
                                        style={{ fontSize: '14px' }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography style={{ fontSize: '14px', color: "#757575" }}>Interessados</Typography>
                                    {interested.map(item => (
                                        <Typography key={item.id}>
                                            {item.nome}
                                        </Typography>
                                    ))}
                                </Grid>
                                <Grid container item alignItems="flex-end">
                                    <Grid item xs={8}>
                                        <TextField

                                            id="name"
                                            label="Novo Interessado"
                                            margin="dense"
                                            variant="standard"
                                            fullWidth
                                            name="nome"
                                            onChange={handleChangeInterest}
                                            style={{ fontSize: '14px' }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box ml={1}>
                                            <Button
                                                onClick={handleAddToInterested}
                                                variant="contained">Adicionar
                                        </Button>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {interested.length <= 0 ? <Typography color="error">Nenhum interessado cadastrado</Typography> : ""}
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>

                                    <TextField
                                        autoFocus
                                        type="text"
                                        required
                                        id="descricao"
                                        label="Descrição"
                                        margin="dense"
                                        variant="standard"
                                        fullWidth
                                        name="descricao"
                                        value={process.descricao}
                                        onChange={handleChange}
                                        style={{ fontSize: '14px' }}
                                        multiline
                                    />
                                </Grid>

                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                variant="outlined"
                                color="primary"
                                style={{ fontSize: '14px' }}
                                onClick={handleClose}
                            >
                                Cancelar
                        </Button>

                            <Button
                                variant="contained"
                                color="primary"
                                style={{ fontSize: '14px' }}
                                type="submit"
                            >
                                Salvar
                        </Button>
                        </DialogActions>
                    </form>
                </Dialog>

            </Box>

        </>
    )
}
