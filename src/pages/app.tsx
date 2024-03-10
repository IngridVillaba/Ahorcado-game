import React from 'react';

import {  Typography, Box} from '@mui/material';
import Game from './game';

function App() {
  return (
  <Box >
    <Typography variant="h3"  fontFamily='monospace' align='center' color="orange">{'¡El ahorcado!'}</Typography>
    <p>Encuentra la palabra... Escribe una letra</p>     
    <Game/>
  </Box>

  );
}

export default App;
