
import { Typography, Grid, Card, CardActionArea, CardContent } from "@material-ui/core";


export default function ProcessCard(props) {
    const { numero, assunto, interessados, descricao, viewProcess, setViewProcess, setOpenDetails } = props
    //console.log(interessados)

    const handleViewProcess = (viewProcess) => {
        setViewProcess(viewProcess)
        setOpenDetails("block")

    }


    return (
        <>
            <Card>
                <CardActionArea href="#" onClick={() => handleViewProcess(viewProcess)}>
                    <CardContent>
                        <Grid container spacing={4} >
                            <Grid item xs={12} sm={12} md={2} lg={1} ><img style={{ width: 70, height: 70 }} src="#" alt="" className="" /></Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3} ><Typography >Número</Typography><Typography >{numero}</Typography></Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}> <Typography >Assunto</Typography><Typography >{assunto}</Typography></Grid>
                            <Grid item xs={12} sm={12} md={2} lg={3}><Typography >Interessado</Typography>{interessados.map(interessado => (
                                <Typography key={interessado.id}>{interessado.name}</Typography>
                            ))}</Grid>
                            <Grid item xs={12} sm={12} md={2} lg={2}><Typography >Descrição</Typography><Typography >{descricao}</Typography></Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}
