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
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import BallotIcon from '@mui/icons-material/Ballot';
import Avatar from '@mui/material/Avatar';
import logo from "../assets/LOGO.png"
import InventoryIcon from '@mui/icons-material/Inventory';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SummarizeIcon from '@mui/icons-material/Summarize';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom'
export default function MenuAppBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [state, setState] = React.useState({
    left: false,
  });
  const navigate = useNavigate();
  const Changeview = (referencia) =>{
    navigate(referencia);
  }
  const listMenu = [
    {
      name: 'Gestion Activos' ,
      href: '/home/activos',
      icon: (<CurrencyExchangeIcon fontSize="small" />),
      title: 'Dashboard'
    },
    {
      name: 'Gestion Inventario' ,
      href: '/home/inventario',
      icon: (<InventoryIcon fontSize="small" />),
      title: 'Customers'
    },
    {
      name: 'Gestion Mantenimiento',
      href: '/home/mantenimiento',
      icon: (<EngineeringIcon fontSize="small" />),
      title: 'Products'
    },
    {
      name: 'Orden de Trabajo' ,
      href: '/home/OTS',
      icon: (<BallotIcon fontSize="small" />),
      title: 'Dashboard'
    },
    {
      name: 'Gestion Reportes',
      href: '/home/reportes',
      icon: (<SummarizeIcon fontSize="small" />),
      title: 'Account'
    },
    {
      name: 'Solicitud de Compra' ,
      href: '/home/compras',
      icon: (<BusinessCenterIcon fontSize="small" />),
      title: 'Dashboard'
    },
    {
      name: 'Tercerización',
      href: '/home/tercerizacion',
      icon: (<GroupIcon fontSize="small" />),
      title: 'Settings'
    },
    {
      name: 'Gestión de Personal',
      href: '/home/personal',
      icon: (<PersonIcon fontSize="small" />),
      title: 'Login'
    },
    {
      name: 'Salir',
      href: '/',
      icon: (<ExitToAppIcon fontSize="small" />),
      title: 'Register'
    },
  ];
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
      <List>
      <Box  sx={{ p: 2,display:'flex',justifyContent:'space-around' }}>
      <Avatar alt="Hospital Santa Inés" src={logo} sx={{ width: 56, height: 56 }} />
      <h5>Hospital Santa Inés</h5>
        </Box>
        {listMenu.map((elemento) => (
          <ListItem  key={elemento.name} disablePadding>
            <ListItemButton onClick={() =>Changeview(elemento.href)} >
              <ListItemIcon>
                {elemento.icon}
              </ListItemIcon>
              <ListItemText primary={elemento.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
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
          </Drawer>
      </>
  );
}
