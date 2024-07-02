import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './pages/Form';
import Redirect from './pages/Redirect';
import { Box, Container, Link, Typography } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2"          sx={{
      fontSize: '12px',
      // backgroundColor: (theme) => theme.palette.grey[800],
      color: (theme) => theme.palette.grey[400]
    }}>
      {'Copyright © '}
      <Link
        color="inherit"
        href="https://www.youtube.com/channel/UCNiJgzoC7f8QvzODJd4LSgA"
      >
        Gérson Aguiar - YT: dev.gersonaguiar
      </Link>{' '}
      {new Date().getFullYear()}
      {'.v0.0.19'}
    </Typography>
  );
}

function App() {
  return (
    <>
    <div style={{          minHeight: '80vh',
}}>

    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/:shortUrl" element={<Redirect />} />
      </Routes>
    </Router>
    </div>
    <Box
        component="footer"
        //  sx={{
        //   backgroundColor: (theme) =>
        //     theme.palette.mode === 'light'
        //       ? theme.palette.grey[800]
        //       : theme.palette.grey[800],
        // }}
      >
        <Container >
            <p style={{fontSize: "12px"}}>
            Desenvolvido por{' '}
            <Link
              color="inherit"
              href="https://www.youtube.com/channel/UCNiJgzoC7f8QvzODJd4LSgA"
            >
              Gérson Aguiar
            </Link>{' '}
            <br /> Entre em contato, para consultoria ou suporte <br /> E-mail:
            gersoncafilho@gmail.com

</p>
          <Copyright />
        </Container>
      </Box>
    </>
  )
}

export default App
