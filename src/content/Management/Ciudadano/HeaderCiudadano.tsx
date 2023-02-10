import { CiudadanoContext } from '@/contexts/CiudadanoContext';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Button, Grid, Typography } from '@mui/material';
import { ICiudadano } from 'interfaces/Ciudadano.js';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { ROLE } from '../../../../constants/default';

function HeaderCiudadano() {
  const { hasPermissions } = useContext(AuthContext);
  const { changeNew, setCurrentResult } = useContext(CiudadanoContext);

  const handleOpenAddNew = () => {
    changeNew && changeNew(true);
    setCurrentResult({} as ICiudadano);
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Ciudadano
        </Typography>
        <Typography variant="subtitle2">
          Lista de ciudadanos registrados
        </Typography>
      </Grid>
      {hasPermissions([ROLE.AddCiudadano]) && (
        <Grid item>
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={() => handleOpenAddNew()}
          >
            Añadir Ciudadano
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

export default HeaderCiudadano;
