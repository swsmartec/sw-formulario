import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import React, { ReactElement } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import BaseLayout from '@/layouts/BaseLayout';
import { useAuth } from '@/contexts/hooks/useAuth';
import Container from '@mui/material/Container';

function LoginView() {
  const { login } = useAuth();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await login(data.get('username'), data.get('password'));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 5, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Usuario"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 4 }}
          >
            Iniciar sesión
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginView;

LoginView.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
