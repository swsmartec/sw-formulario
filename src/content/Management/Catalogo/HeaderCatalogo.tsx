import { CatalogoContext } from '@/contexts/CatalogoContext';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Button, Grid, Typography } from '@mui/material';
import { ICatalogo } from 'interfaces/Catalogo';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { ROLE } from '../../../../constants/default';

function HeaderCatalogo() {
  const { hasPermissions } = useContext(AuthContext);
  const { changeNew, setCurrentResult } = useContext(CatalogoContext);

  const handleOpenAddNew = () => {
    changeNew && changeNew(true);
    setCurrentResult({} as ICatalogo);
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Catálogo
        </Typography>
        <Typography variant="subtitle2">
          Estos son sus catálogos recientes
        </Typography>
      </Grid>
      {hasPermissions([ROLE.AddCatalogo]) && (
        <Grid item>
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={() => handleOpenAddNew()}
          >
            Añadir Catálogo
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

export default HeaderCatalogo;
