import React from 'react';
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
import BallotIcon from '@mui/icons-material/Ballot';
import InventoryIcon from '@mui/icons-material/Inventory';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SummarizeIcon from '@mui/icons-material/Summarize';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom'

export default function MenuApp2(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [state, setState] = React.useState({
        left: false,
    });
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
    const [open5, setOpen5] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    const handleClick1 = () => {
        setOpen1(!open1);
    };
    const handleClick2 = () => {
        setOpen2(!open2);
    };
    const handleClick3 = () => {
        setOpen3(!open3);
    };
    const handleClick4 = () => {
        setOpen4(!open4);
    };
    const handleClick5 = () => {
        setOpen5(!open5);
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


    return (
        <>
            <AppBar color="primary" position="static">
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
                    <Typography align='left' variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {props.text}
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
                            Nested List Items
                        </ListSubheader>
                    }
                >
                    <ListItemButton onClick={() =>Changeview('/home/OTS')}>
                        <ListItemIcon>
                            <BallotIcon />
                        </ListItemIcon>
                        <ListItemText primary="Ordenes de Trabajo" />
                    </ListItemButton>

                    <ListItemButton onClick={() =>Changeview('/home/compras')}>
                        <ListItemIcon>
                            <BusinessCenterIcon />
                        </ListItemIcon>
                        <ListItemText primary="Solicitud de Compra" />
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

                            <ListItemButton onClick={() =>Changeview('/home/activos/equipos')} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Equipos" />
                            </ListItemButton>

                            <ListItemButton onClick={() =>Changeview('/home/activos/contrato')} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Contratos" />
                            </ListItemButton>

                            <ListItemButton onClick={() =>Changeview('/home/activos/indicadores')} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Indicadores" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                    {/* Fin Boton Gestion de Activos  */}

                    {/* Boton Gestion de Inventario */}
                    <ListItemButton onClick={handleClick1}>
                        <ListItemIcon>
                            <InventoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="Gestion de Inventario" />
                        {open1 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open1} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItemButton onClick={() =>Changeview('/home/inventario/invequipos')} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Inventario Equipos" />
                            </ListItemButton>

                            <ListItemButton onClick={() =>Changeview('/home/inventario/contratos')} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Contratos" />
                            </ListItemButton>

                            <ListItemButton onClick={() =>Changeview('/home/inventario/solicitudcompra')} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Solicitud de Compra" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                    {/* Fin Boton Gestion de Inventario  */}

                    {/* Boton Gestion de Mantenimiento */}
                    <ListItemButton onClick={handleClick5}>
                        <ListItemIcon>
                            <EngineeringIcon />
                        </ListItemIcon>
                        <ListItemText primary="Gestion de Mantenimiento" />
                        {open5 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open5} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItemButton onClick={() =>Changeview('/home/mantenimiento/estatus')} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Estatus Ordenes de Trabajo" />
                            </ListItemButton>

                            <ListItemButton onClick={() =>Changeview('/home/mantenimiento/mantenimiento')} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Plan de Mantenimiento" />
                            </ListItemButton>
                            
                            <ListItemButton onClick={() =>Changeview('/home/mantenimiento/contactos')} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Contactos Empresas" />
                            </ListItemButton>

                        </List>
                    </Collapse>
                    {/* Fin Boton Gestion de Mantenimiento  */}

                    {/* Boton Gestion de Reportes */}
                    <ListItemButton onClick={handleClick2}>
                        <ListItemIcon>
                            <SummarizeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Gestion de Reportes" />
                        {open2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItemButton onClick={() =>Changeview('/home/reportes/reportes')} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Estátus R. Internos" />
                            </ListItemButton>

                            <ListItemButton onClick={() =>Changeview('/home/reportes/externos')} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Estátus R. Externos" />
                            </ListItemButton>

                            {/* <ListItemButton onClick={() =>Changeview('/home/reportes/agregar')} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Formulario Reporte" />
                            </ListItemButton> */}
                        </List>
                    </Collapse>
                    {/* Fin Boton Gestion de Reportes  */}


                    {/* Boton Gestion de Tercerizados */}
                    <ListItemButton onClick={handleClick3}>
                        <ListItemIcon>
                            <GroupIcon />
                        </ListItemIcon>
                        <ListItemText primary="Gestion de Tercerizados" />
                        {open3 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open3} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItemButton onClick={() =>Changeview('/home/tercerizacion')} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Reporte de Mantenimiento" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                    {/* Fin Boton Gestion de Tercerizados  */}


                    {/* Boton Gestion de Personal */}
                    <ListItemButton onClick={handleClick4}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Gestion de Personal" />
                        {open4 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open4} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItemButton onClick={() =>Changeview('/home/personal/datospersonal')} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Datos Personales" />
                            </ListItemButton>

                            <ListItemButton onClick={() =>Changeview('/home/personal/historicos')} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Historicos" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                    {/* Fin Boton Gestion de Personal  */}

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
