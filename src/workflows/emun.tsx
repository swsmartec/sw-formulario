import { Constants } from '../../constants/default';

export const StepperForm = [
  {
    StepperId: Constants.CodeEstadoCreado,
    StepperName: 'Formulario creado',
    Order: 1
  },
  {
    StepperId: Constants.CodeEstadoAsignado,
    StepperName: 'Asignado a un operador',
    Order: 2
  },
  {
    StepperId: Constants.CodeEstadoRevisado,
    StepperName: 'Revisado por perfil de negocio',
    Order: 3
  },
  {
    StepperId: Constants.CodeEstadoRevisadoOficialCumplimiento,
    StepperName: 'Revisado por oficial de cumplimiento',
    Order: 4
  },
  {
    StepperId: Constants.CodeEstadoEnviarCliente,
    StepperName: 'Enviar al cliente para su revision',
    Order: 5
  },
  {
    StepperId: Constants.CodeEstadoLegalizadoCliente,
    StepperName: 'Legalizado por cliente',
    Order: 6
  },
  {
    StepperId: Constants.CodeEstadoEnvioSicav,
    StepperName: 'Registrado en Sicav',
    Order: 7
  }
];

export const WorkflowForm = {
  Created: Constants.CodeEstadoCreado,
  Assigned: Constants.CodeEstadoAsignado,
  Reviewed: Constants.CodeEstadoRevisado,
  ReviewedOfficial: Constants.CodeEstadoRevisadoOficialCumplimiento,
  SendingClient: Constants.CodeEstadoEnviarCliente,
  LegalizedClient: Constants.CodeEstadoLegalizadoCliente,
  SendSivac: Constants.CodeEstadoEnvioSicav,
  CheckBlacklists: Constants.CodeEstadoBlackLists
};
