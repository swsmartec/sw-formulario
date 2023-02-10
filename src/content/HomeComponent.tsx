import Link from 'next/link';
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Router from 'next/router';
import Alert from '@mui/material/Alert';
import { post } from '../../helpers/service';
import { apiFormGetIdentification } from '../../constants/api';
import Snackbar from '@mui/material/Snackbar';

export const HomeComponent = () => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = async () => {
    const wsTypeIdentifier = await post(apiFormGetIdentification, {
      IdentificationCard: message
    });
    if (wsTypeIdentifier) {
      var tipoFormulario = wsTypeIdentifier.TipoFormulario.Valor;
      if (tipoFormulario === 'PersonaNatural') {
        localStorage.setItem(
          'natural_person',
          wsTypeIdentifier.DetalleFormulario
        );
        Router.push('/formulario/natural');
      } else if (tipoFormulario === 'PersonaJuridica') {
        localStorage.setItem(
          'legal_person',
          wsTypeIdentifier.DetalleFormulario
        );
        Router.push('/formulario/legal');
      } else if (tipoFormulario === 'Fideicomiso') {
        localStorage.setItem(
          'fidecomisos_person',
          wsTypeIdentifier.DetalleFormulario
        );
        Router.push('/formulario/fideicomiso');
      }
      //0706984085
    } else {
      setOpenAlert(true);
      setOpen(false);
    }
  };

  const handleChange = (value) => {
    setMessage(value.target.value);
  };

  const handleCloseAlert = (
    _event?: React.SyntheticEvent | Event,
    _reason?: string
  ) => {
    setOpenAlert(false);
  };

  return (
    <div className="content">
      <div className="txt03">Formularios Conocimiento de Cliente</div>
      <div className="txt02">Selecciona el tipo de cliente</div>
      <div className="optionContainer">
        <div className="option">
          <Link href={'/formulario/natural'}>
            <div className="optionContent style1">
              <div className="imageContent">
                <img
                  src={require('../../assets/images/icon1.svg').default}
                  alt="Naturales"
                />
              </div>
              <div className="button btn1">Natural</div>
            </div>
          </Link>
        </div>
        <div className="option">
          <Link href={'/formulario/legal'}>
            <div className="optionContent style2">
              <div className="imageContent">
                <img
                  src={require('../../assets/images/icon2.svg').default}
                  alt="Jurídicas"
                />
              </div>
              <div className="button btn2">Jurídica</div>
            </div>
          </Link>
        </div>
        <div className="option">
          <Link href={'/formulario/fideicomiso'}>
            <div className="optionContent style3">
              <div className="imageContent">
                <img
                  src={require('../../assets/images/icon3.svg').default}
                  alt="Fideicomisos"
                />
              </div>
              <div className="button btn3">Fideicomiso</div>
            </div>
          </Link>
        </div>
      </div>
      <div className="buscarFormulario">
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AssignmentTurnedInIcon fontSize="small" />}
          onClick={() => handleClickOpen()}
        >
          Buscar formulario
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Buscar formulario</DialogTitle>
          <DialogContent>
            <DialogContentText>Ingrese el número de cédula</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="cedula"
              label="Cédula"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleSearch}>Buscar</Button>
          </DialogActions>
        </Dialog>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="warning"
          sx={{ width: '100%' }}
        >
          No tenemos ningun formulario registrado con esa identificacion
        </Alert>
      </Snackbar>
    </div>
  );
};

export default HomeComponent;
