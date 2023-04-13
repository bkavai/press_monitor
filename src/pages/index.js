import React, { useContext, useEffect, useRef, useState } from "react"
import { Card, CardContent, Container, CssBaseline, Divider, Grid, Paper, Typography } from "@mui/material"
import { StateContext } from "../services/stateService.js"
import { withRouter } from "react-router-dom"
import { dateTimeFormatter, emptyStringIfEmpty, PRIMARY_COLOR, WHITE_COLOR } from "../constants.js"
import { makeStyles } from "@mui/styles"
import { Line } from "react-chartjs-2"
import Chart from "chart.js/auto"
import "chartjs-adapter-date-fns"
import { enUS } from "date-fns/locale"
const Index = props => {
    const context = useRef(useContext(StateContext))
    const [time, setTime] = useState(0)
    const [pressure, setPressure] = useState(0.0)
    const [dataset, setDataset] = useState([])
    const datasetStatic = useRef([])

    const useStyles = makeStyles(theme => ({
        "@global": {
            body: {
                backgroundColor: WHITE_COLOR,
            },
        },
        root: {
            marginTop: theme.spacing(4),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        avatar: {
            color: PRIMARY_COLOR,
        },
    }))

    const classes = useStyles()

    useEffect(() => {
        context.current.awsService.connect(
            `web_mg100_dashboard`,
            `$aws/things/+/shadow/+/accepted`,
            message_callback,
            function (is_resuming) {},
            function (error_message) {
                console.log(error_message)
            }
        )
    }, [])

    const message_callback = message_json => {
        console.log(message_json)

        if (message_json.state) {
            if (message_json.state.reported.pressure) {
                setPressure(message_json.state.reported.pressure)

                let newDataSet = [...datasetStatic.current]

                newDataSet.push({
                    x: message_json.timestamp * 1000,
                    y: message_json.state.reported.pressure,
                })

                setDataset(newDataSet)

                datasetStatic.current = newDataSet

                console.log(newDataSet)
            }
            setTime(message_json.timestamp)
        }
    }

    const options = {
        animation: false,
        parsing: false,

        interaction: {
            mode: "nearest",
            axis: "x",
            intersect: false,
        },
        plugins: {
            decimation: {
                enabled: false,
                algorithm: "min-max",
            },
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                type: "time",
                ticks: {
                    display: false,
                    source: "auto",
                    maxRotation: 0,
                    autoSkip: true,
                },
                title: {
                    display: true,
                    text: "Time",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Pressure ",
                },
            },
        },
        elements: {
            line: {
                borderWidth: 0,
            },
        },
    }

    const data = {
        datasets: [
            {
                label: "Pressure",
                data: dataset,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)",
            },
        ],
    }

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.root}>
                <Card variant="outlined" style={{ paddingBottom: 10 }}>
                    <CardContent>
                        <Paper style={{ padding: 10, width: 600 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Davis Holdings
                            </Typography>
                            <Divider />
                            <Grid container spacing={2} style={{ marginTop: 0, marginBottom: 0 }}>
                                <Grid container item md={6}>
                                    <Grid item sm={6}>
                                        <Typography
                                            variant="body2"
                                            gutterBottom
                                            style={{
                                                height: "20px",
                                                color: PRIMARY_COLOR,
                                                fontWeight: "bolder",
                                            }}
                                        >
                                            Time:
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={6}>
                                        <Typography variant="body2" gutterBottom style={{ height: "20px" }}>
                                            {emptyStringIfEmpty(dateTimeFormatter(time))}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item md={6}>
                                    <Grid item sm={6}>
                                        <Typography
                                            variant="body2"
                                            gutterBottom
                                            style={{
                                                height: "20px",
                                                color: PRIMARY_COLOR,
                                                fontWeight: "bolder",
                                            }}
                                        >
                                            Pressure (psi):
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={6}>
                                        <Typography variant="body2" gutterBottom style={{ height: "20px" }}>
                                            {emptyStringIfEmpty(pressure)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item md={12}>
                                    <Line options={options} data={data} />
                                </Grid>
                            </Grid>
                        </Paper>
                    </CardContent>
                </Card>
            </div>
        </Container>
    )
}

export default withRouter(Index)
