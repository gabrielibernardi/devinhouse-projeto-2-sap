
import { Typography, Grid, Card, CardActionArea, CardContent } from "@material-ui/core";


export default function ProcessCard(props) {
    const { viewProcess, setViewProcess, setOpenDetails } = props

    const handleViewProcess = (obj) => {
        setViewProcess(obj)
        setOpenDetails("block")
    }


    return (
        <>
            <Card >
                <CardActionArea href="#" onClick={() => handleViewProcess(viewProcess)}>
                    <CardContent>
                        <Grid container spacing={2} >
                            <Grid item xs={3} sm={2} md={2} lg={1}><img style={{ width:"100%" }} src="img/placeholder.png" /></Grid>
                            <Grid item xs={12} sm={12} md={12} lg={3}>
                                <Typography variant="subtitle1" style={{ fontSize: '14px', fontWeight: "bold" }}>Número</Typography>
                                <Typography variant="body1" style={{ fontSize: '16px' }}>{viewProcess.numero}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={3}>
                                <Typography variant="subtitle1" style={{ fontSize: '14px', fontWeight: "bold" }}>Assunto</Typography>
                                <Typography variant="body1" style={{ fontSize: '16px' }}>{viewProcess.assunto}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={3}>
                                <Typography variant="subtitle1" style={{ fontSize: '14px', fontWeight: "bold" }}>Interessado</Typography>
                                {viewProcess.interessados.map(interessado => (
                                    <Typography variant="body1" style={{ fontSize: '16px' }} key={interessado.id}>{interessado.nome}</Typography>
                                ))}</Grid>
                            <Grid item xs={12} sm={12} md={12} lg={2}>
                                <Typography  variant="subtitle1" style={{ fontSize: '14px', fontWeight: "bold" }}>Descrição</Typography>
                                <Typography variant="body1" style={{ fontSize: '16px' }} >{viewProcess.descricao}</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}

