import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from '@material-ui/core';
import { HeaderState } from './headerState';

export default function ButtonAppBar() {

  const linkStyles = {
    mr: 2,
    display: {xs: 'none', sm: 'none', md: 'flex'},
    cursor: 'pointer',
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{bgcolor: 'black'}} position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BookMi
          </Typography>
          <Link sx={linkStyles} variant="body2" underline="none" color="inherit" component="div" href="#">Home</Link>
          <Link sx={linkStyles} variant="body2" underline="none" color="inherit" component="div" href="#">Services</Link>
          <Link sx={linkStyles} variant="body2" underline="none" color="inherit" component="div" href="#">Stylists</Link>
          <Box sx={linkStyles}><HeaderState/></Box>
          <Link color="inherit" underline="none" variant="body2" component="button">Book Now</Link>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ margin: 'auto', display: {md: 'none'} }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}