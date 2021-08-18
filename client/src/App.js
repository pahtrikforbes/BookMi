import React from 'react';
import { Container, Grid, ListItem } from '@material-ui/core';
import Header from "./features/header"
import './App.css';
function App() {
  return (
    <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={12}>
    <Header/>
  </Grid>
  <Grid item xs={12}>
    <Container sx={{bgcolor: 'black', color: 'white'}} maxWidth="xl">2</Container>
  </Grid>
</Grid>
  );
}

export default App;
