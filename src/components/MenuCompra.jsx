import React ,{useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import { query, collection,onSnapshot } from "firebase/firestore";
import { db } from '../firebase/firebase-config';



export default function MenuCompra(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [state, setState] = React.useState({
        left: false,
    });
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const [currentuid ,setCurrentuid] = React.useState([{correo:'cargando..',uid: 'cargando..',ordenes:false}]);
    const getData = () =>{
        const reference = query(collection(db, "usuario"));
        onSnapshot(reference, (querySnapshot) => {
            console.log(querySnapshot.docs)
            setCurrentuid(
                querySnapshot.docs.map((doc) => ({ ...doc.data() }))
            );

        });
    }

    
    const handleClick = () => {
        setOpen(!open);
    };
  

    const Changeview = (referencia) => {
        navigate(referencia);
    }


    // funcion para hacer funcionar el drawer
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    //menu
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    //drawer a mostrar
    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Divider />
        </Box>
    );

    useEffect(() => {
        getData();
    }, [])
    return (
        <>
            <AppBar  className="bts" position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer('left', true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography align='right' variant="h6" component="div" sx={{ flexGrow: 1 }}>
                       {currentuid[0].correo}
                    </Typography>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Perfil</MenuItem>
                            <MenuItem onClick={handleClose}>Configuraciones</MenuItem>
                            <MenuItem onClick={handleClose}>Salir</MenuItem>
                        </Menu>
                    </div>

                </Toolbar>
            </AppBar>
            <Drawer
                anchor={'left'}
                open={state['left']}
                onClose={toggleDrawer('left', false)}
            >
                {list('left')}
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            GMAO
                            "HOSPITAL SANTA INES"
                        </ListSubheader>
                    }
                >
 
                    <ListItemButton onClick={() =>Changeview('compras')}>
                        <ListItemIcon>
                            <BusinessCenterIcon />
                        </ListItemIcon>
                        <ListItemText primary="Estátus Compras" />
                    </ListItemButton>

                    {/* Boton Gestion de Activos  */}
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <CurrencyExchangeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Gestion de Activos" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItemButton onClick={() =>Changeview('activos/equipos')} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Equipos" />
                            </ListItemButton>

                            <ListItemButton onClick={() =>Changeview('activos/contrato')} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Contratos" />
                            </ListItemButton>

                            <ListItemButton onClick={() =>Changeview('activos/indicadores')} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Indicadores" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                    {/* Fin Boton Gestion de Activos  */}
 
                    <ListItemButton onClick={() =>Changeview('/')}>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Salir" />
                    </ListItemButton>

                </List>
            </Drawer>
        </>
    );
}
