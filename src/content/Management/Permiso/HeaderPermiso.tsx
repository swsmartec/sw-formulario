import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Button, Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { IPermiso } from 'interfaces/Permiso';
import { PermisoContext } from '@/contexts/PermisoContext';
import { AuthContext } from '@/contexts/AuthContext';
import { ROLE } from '../../../../constants/default';

function HeaderPermiso() {
  const { hasPermissions } = useContext(AuthContext);
  const { changeNew, setCurrentResult } = useContext(PermisoContext);

  const handleOpenAddNew = () => {
    changeNew && changeNew(true);
    setCurrentResult({} as IPermiso);
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Roles y permisos
        </Typography>
        <Typography variant="subtitle2">
          Estos son sus roles recientes
        </Typography>
      </Grid>
      {hasPermissions([ROLE.AddPermiso]) && (
        <Grid item>
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={() => handleOpenAddNew()}
          >
            Añadir Rol
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

export default HeaderPermiso;
