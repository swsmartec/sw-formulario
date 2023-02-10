import { FormularioContext } from '@/contexts/FormularioContext';
import React, { useCallback, useContext } from 'react';
import NaturalDetailView from '@/content/Management/Formulario/Tipo/Natural/Detail';
import { Container, Grid, Skeleton, Stack } from '@mui/material';
import { get, post } from '../../../../helpers/service';
import { useRouter } from 'next/router';
import { replaceObjectInString } from '../../../../helpers/Utils';
import {
  apiCatalogActividadesList,
  apiCatalogList,
  apiFormularioActionWorkflow,
  apiFormularioRetrieve
} from '../../../../constants/api';
import { ListCodesCatalog, ROLE } from '../../../../constants/default';
import { ICatalogoService } from '../../../../interfaces/Catalogo';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { StepperForm } from '@/workflows/emun';
import { TransitionForm } from '@/workflows/flows';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { AuthContext } from '@/contexts/AuthContext';

const DetailFormulario = () => {
  const router = useRouter();
  const { pid } = router.query;
  const { selectedResult, setCurrentResult, setListCatalogo, changeList } =
    useContext(FormularioContext);
  const { user, hasPermissions } = useContext(AuthContext);
  const [showForm, setShowForm] = React.useState<boolean>(false);
  const [currentFlow, setCurrentFlow] = React.useState<any>({});
  const [comment, setComment] = React.useState<any>('');
  const [open, setOpen] = React.useState(false);
  const [transitionList, setTransitionList] = React.useState([]);

  React.useEffect(() => {
    if (!router.isReady) {
      return;
    }
    changeList(false);
    const getData = async () => {
      let urlSite = replaceObjectInString(apiFormularioRetrieve, { id: pid });
      let formDetail = await get(urlSite);
      let listCatalog = await post(apiCatalogList, {
        Codigo: ListCodesCatalog.join(',')
      });
      let listCatalogActividades = await post(apiCatalogActividadesList, {
        Codigo: 'PNA'
      });
      return { formDetail, listCatalog, listCatalogActividades };
    };

    getData().then((resp) => {
      const { formDetail, listCatalog, listCatalogActividades } = resp;
      let listCatalogs = [] as ICatalogoService[];
      for (const [_key, listValues] of Object.entries(listCatalog)) {
        let values = listValues as ICatalogoService[];
        values.forEach((value: ICatalogoService) => {
          listCatalogs.push(value);
        });
      }

      listCatalogActividades.forEach((element) => {
        listCatalogs.push({
          ITC_ID: element['ACE_ID'],
          ITC_NOMBRE: element['ACE_DESCRIPCION']
        } as ICatalogoService);
      });

      setCurrentResult({
        ...formDetail,
        ObjectDetalle: JSON.parse(formDetail.DetalleFormulario)
      });
      setListCatalogo(listCatalogs);
      setShowForm(true);
    });
  }, [pid]);

  const hasUniqueUser = (unique: boolean) => {
    if (!unique) return true;
    return user.UsuarioId == selectedResult?.OperadorId;
  };

  React.useEffect(() => {
    let listTransaction = TransitionForm.filter(
      (fl) =>
        hasPermissions(fl.permission) &&
        hasPermissions(fl.roles) &&
        hasUniqueUser(fl?.unique == true) &&
        fl.source.includes(selectedResult.Estado?.ListaSeleccionId)
    );
    setTransitionList(listTransaction);
  }, [selectedResult]);

  const currentStep = useCallback(() => {
    let value = StepperForm.find(
      (step) => step.StepperId === selectedResult.Estado?.ListaSeleccionId
    );
    if (value) return value.Order;
    return 1;
  }, [selectedResult]);

  const handleSend = () => {
    let isBack = currentFlow.custom?.isBack == true;
    let dataSend = {
      EstadoId: currentFlow.target,
      Comentario: comment,
      IsAnterior: isBack
    };
    let urlSite = replaceObjectInString(apiFormularioActionWorkflow, {
      id: pid
    });
    setTransitionList([]);
    post(urlSite, dataSend)
      .then((res) => {
        let formDetail = res;
        setCurrentResult({
          ...formDetail,
          ObjectDetalle: JSON.parse(formDetail.DetalleFormulario)
        });
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen(false);
  };
  const handleClickOpen = (flow: any) => {
    setOpen(true);
    setCurrentFlow(flow);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="lg">
      {showForm && (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
          sx={{ mb: 1 }}
        >
          <Grid item xs={12}>
            <Stepper activeStep={currentStep()} alternativeLabel>
              {StepperForm.map((step) => (
                <Step key={step.StepperId}>
                  <StepLabel>{step.StepperName}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Stack direction="row" justifyContent="end">
              {transitionList.map((flow) => (
                <Button
                  key={flow.source}
                  variant="contained"
                  startIcon={flow.custom.icon}
                  onClick={() => handleClickOpen(flow)}
                  sx={{ ml: 1 }}
                >
                  {flow.custom.verbose || 'Siguiente'}
                </Button>
              ))}
              {hasPermissions([ROLE.ChangeFormulario]) && (
                <Link
                  href={`/management/formulario/form/${selectedResult.FormularioId}`}
                  sx={{ ml: 1 }}
                >
                  <Button
                    component={Link}
                    variant="contained"
                    startIcon={<EditTwoToneIcon fontSize="small" />}
                  >
                    Editar
                  </Button>
                </Link>
              )}
            </Stack>
          </Grid>
        </Grid>
      )}
      {showForm && selectedResult.TipoFormulario.Valor == 'PersonaNatural' && (
        <NaturalDetailView />
      )}
      {showForm && selectedResult.TipoFormulario.Valor == 'PersonaJuridica' && (
        <NaturalDetailView />
      )}
      {showForm && selectedResult.TipoFormulario.Valor == 'Fideicomisos' && (
        <NaturalDetailView />
      )}
      {!showForm && (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={25} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={50} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={200} />
          </Grid>
        </Grid>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Cambio de estado</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {currentFlow.custom?.message}
          </DialogContentText>
          {currentFlow.custom?.hasMessage ? (
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                id="outlined-multiline-flexible"
                label="Comentario"
                multiline
                maxRows={6}
                rows={6}
                fullWidth
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
            </Grid>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSend} autoFocus>
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DetailFormulario;
