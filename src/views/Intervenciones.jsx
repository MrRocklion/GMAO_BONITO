import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Barchart2 from "../components/Graficapersonal";
import { db } from "../firebase/firebase-config";
import { Input } from "reactstrap";
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#000',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export default function Indicadores() {
    const [nombre, setNombre] = useState("");
    const [fallas, setFallas] = useState([]);
    const [reportin, setReportin] = useState([]);
    const [personales, setPersonales] = useState([]);
    const [horasp, setHorasp] = useState([]);
    const [datouser, setDatouser] = useState([]);
    const [dataselec, setDataselec] = useState([]);

    const selecCedula = (e) => {
        console.log(e.target.value)
        setNombre(e.target.value);
        const filtrados = reportin.filter(machine => machine.cedulat === e.target.value)
        var reformat = filtrados.map(function (obj) {
            var someDate1 = new Date(obj.fetermino);
            someDate1 = someDate1.getTime();
            var hours1 = someDate1 / (1000 * 60 * 60);
            var someDate2 = new Date(obj.feinicio);
            someDate2 = someDate2.getTime();
            var hours2 = someDate2 / (1000 * 60 * 60);
            var resultado = hours1 - hours2
            return resultado

        });
        var fallos = filtrados.map(function (obj) {
            return [obj.feinicio, obj.fetermino]
        });
        console.log(fallos);
        setFallas(fallos);
        let total = reformat.reduce((a, b) => a + b, 0);
        setHorasp([total / 16000]);
        var meses = fallos.map(function (fecha) {
            console.log(fecha[1]);
            var someDate1 = new Date(fecha[1]);
            var mes = someDate1.getMonth();
            return mes;
        })
        var datos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        var i = 0;
        for (let value of meses) {

            datos[value] = reformat[i]
            i++
        }

        setDatouser(datos);


    };
 
    const getReportes = () => {
        const internos = query(collection(db, "reportesint"));
        onSnapshot(internos, (querySnapshot) => {
            setReportin(
                querySnapshot.docs.map((doc) => ({ ...doc.data() }))
            );
        });

        const empleados = query(collection(db, "dpersonales"));
        onSnapshot(empleados, (querySnapshot) => {
            setPersonales(
                querySnapshot.docs.map((doc) => ({ ...doc.data() }))
            );
        });
    }

    useEffect(() => {
        getReportes();

    }, [])

    return (
        <>
            <br />
            <h1>INDICADORES PRODUCTIVIDAD</h1>
            <h3>Productividad Laboral</h3>
            <br />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={1}></Grid>
                    <Grid item xs={6} md={5}>
                        <select onChange={selecCedula} className="form-select" aria-label="Default select seguro">

                            {personales.map((dato, index) => (<option key={index} value={dato.codigo}>{dato.apellidos}</option>))}
                        </select>
                    </Grid>
                    <Grid item xs={6} md={5}>
                        <Input
                            readOnly
                            value={nombre}
                            label="Nombre"
                        />
                    </Grid>
                    <Grid item xs={6} md={1}></Grid>
                    <Grid item xs={6} md={1}></Grid>
                    <Grid item xs={6} md={7}>
                        <Item>
                            <p> Gráfica de Barras</p>
                            <Barchart2 datos={datouser} />
                        </Item>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Item>

                        </Item>
                    </Grid>
                    <Grid item xs={6} md={1}></Grid>
                </Grid>
            </Box>
        </>
    );
}

