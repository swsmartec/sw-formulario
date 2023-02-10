import React from 'react';
import { Box, Modal } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  p: 4
};

export const TerminosCondicionesComponent = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <span onClick={handleOpen} style={{ cursor: 'pointer' }}>
        Términos y Condiciones
      </span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ height: '500px', overflow: 'auto', padding: '20px' }}>
            <h3>TÉRMINOS Y CONDICIONES PICAVAL CASA DE VALORES S.A.</h3>
            <br />
            <p style={{ textAlign: 'justify' }}>
              El uso de este sitio web o cualquiera de sus componentes,
              constituye el pleno y expreso consentimiento por parte del usuario
              para observar y sujetarse a cada uno de los términos y
              condiciones, políticas de privacidad, políticas de seguridad y la
              regulación establecida por los entes de control respecto a las
              Casas de Valores.{' '}
            </p>
            <br />
            <ol style={{ textDecoration: 'underline', fontWeight: 'bold' }}>
              <li>Uso y restricciones</li>
            </ol>
            <br />
            <p style={{ textAlign: 'justify' }}>
              A través del sitio web, el usuario podrá tener acceso a la
              información, formularios y demás contenidos del mismo. PICAVAL
              tendrá derecho a negar, restringir o condicionar al usuario el
              acceso al sitio, así como a modificar los términos y condiciones
              disponibles a través del portal en cualquier momento y sin previo
              aviso al usuario.
            </p>
            <br />
            <p style={{ textAlign: 'justify' }}>
              El usuario reconoce y acepta que no toda la información requerida
              para el acceso a los productos y servicios de PICAVAL, se
              encuentra contenida en el presente sitio web y podrá ser
              solicitada de forma directa para total perfeccionamiento.
            </p>
            <br />
            <p style={{ textAlign: 'justify' }}>
              El uso del presente sitio web es de exclusiva responsabilidad del
              usuario, quien deberá utilizarlo de conformidad con las
              funcionalidades establecidas en el mismo y los usos autorizados en
              los presentes términos y condiciones o en su caso, en los
              contratos respectivos; así como en las normas y leyes que rigen en
              Ecuador, buenas costumbres y derechos de terceros.
            </p>
            <br />
            <p style={{ textAlign: 'justify' }}>
              Queda expresamente prohibido que el usuario:{' '}
            </p>
            <br />
            <ol type="a">
              <li>Use o replique el portal</li>
              <li>
                Utilice el sitio web en actividades contrarias a la ley, moral,
                buenas costumbres, fines ilícitos, prohibidos o lesivos de
                derechos e intereses de terceros.{' '}
              </li>
            </ol>
            <br />
            <ol
              style={{ textDecoration: 'underline', fontWeight: 'bold' }}
              start="2"
            >
              <li>Propiedad Intelectual</li>
            </ol>
            <br />
            <p style={{ textAlign: 'justify' }}>
              Los derechos de propiedad intelectual del sitio web, logotipos,
              signos distintivos y dominios del portal, así como los derechos de
              uso y explotación de los mismos son de exclusiva propiedad de
              PICAVAL. Todo el contenido del sitio web está protegido por la
              legislación ecuatoriana y normas relativas a la materia.{' '}
            </p>
            <br />
            <p style={{ textAlign: 'justify' }}>
              El usuario del sitio web reconoce y acepta que la titularidad
              señalada en el párrafo anterior es aplicable a terceros.
            </p>
            <br />
            <ol
              style={{ textDecoration: 'underline', fontWeight: 'bold' }}
              start="3"
            >
              <li>Confidencialidad y Aviso de Privacidad </li>
            </ol>
            <br />
            <p style={{ textAlign: 'justify' }}>
              PICAVAL mantiene procesos y medidas conducentes a mantener las
              seguridades necesarias que estén a su alcance, a efectos de
              mantener la confidencialidad de la información que reciba del
              usuario, de conformidad con las declaraciones que el usuario
              realiza.
            </p>
            <br />
            <ol
              style={{ textDecoration: 'underline', fontWeight: 'bold' }}
              start="4"
            >
              <li>Datos Personales</li>
            </ol>
            <br />
            <p style={{ textAlign: 'justify' }}>
              Recopilamos información como nombres y apellidos, correo
              electrónico, números telefónicos, ciudad y país de residencia,
              ingresos, egresos, patrimonio, información laboral, entre otros
              correspondientes a la debida diligencia realizada por Picaval.{' '}
            </p>
            <br />
            <p style={{ textAlign: 'justify' }}>
              Estos datos se utilizan con el objetivo de dar cumplimiento con
              las disposiciones de las autoridades de control y normas internas
              tendientes a conocer a nuestros clientes, así como para cumplir
              con las obligaciones contractuales y legales que correspondan.
            </p>
            <br />
            <p style={{ textAlign: 'justify' }}>
              La información proporcionada en este documento y en general la
              información proporcionada a PICAVAL, será de estricta
              confidencialidad y será utilizada por PICAVAL en cumplimiento de
              la ley para las transacciones bursátiles o fines constantes en el
              respectivo contrato.
            </p>
            <br />
            <p style={{ textAlign: 'justify' }}>
              La información se mantendrá en los archivos de PICAVAL de forma
              digital hasta el tiempo previsto en la norma.{' '}
            </p>
            <br />
            <ol
              style={{ textDecoration: 'underline', fontWeight: 'bold' }}
              start="5"
            >
              <li>Jurisdicción </li>
            </ol>
            <br />
            <p style={{ textAlign: 'justify' }}>
              En caso de controversias, se estará a las disposiciones del
              contrato comercial de servicios electrónicos.
            </p>
            <br />
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default TerminosCondicionesComponent;
