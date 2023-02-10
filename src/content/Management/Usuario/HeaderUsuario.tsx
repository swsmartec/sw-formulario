import { UsuarioContext } from '@/contexts/UsuarioContext';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Button, Grid, Typography } from '@mui/material';
import { IUsuario } from 'interfaces/Usuario';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { ROLE } from '../../../../constants/default';

function HeaderUsuario() {
  const { hasPermissions } = useContext(AuthContext);
  const { changeNew, setCurrentResult } = useContext(UsuarioContext);

  const handleOpenAddNew = () => {
    changeNew && changeNew(true);
    setCurrentResult({} as IUsuario);
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Usuarios
        </Typography>
        <Typography variant="subtitle2">
          Estos son sus usuarios recientes
        </Typography>
      </Grid>
      {hasPermissions([ROLE.AddUsuario]) && (
        <Grid item>
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={() => handleOpenAddNew()}
          >
            Añadir Usuario
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

export default HeaderUsuario;
