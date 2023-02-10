import { WorkflowForm } from '@/workflows/emun';
import UndoIcon from '@mui/icons-material/Undo';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VpnKeyOffIcon from '@mui/icons-material/VpnKeyOff';
import VerifiedIcon from '@mui/icons-material/Verified';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import SaveIcon from '@mui/icons-material/Save';
import React from 'react';
import { ROLE } from '../../constants/default';

export const TransitionForm = [
  {
    field: 'state',
    source: [WorkflowForm.Created],
    target: WorkflowForm.Assigned,
    roles: [ROLE.Admin, ROLE.Operator],
    permission: [ROLE.ChangeFormulario],
    custom: {
      icon: <CheckCircleIcon fontSize="small" />,
      verbose: 'Asignarme como operador',
      message: 'En esta acción nos asignamos como operador de este formulario.'
    }
  },
  {
    field: 'state',
    source: [WorkflowForm.Assigned],
    target: WorkflowForm.Created,
    roles: [ROLE.Admin, ROLE.Operator],
    permission: [ROLE.ChangeFormulario],
    unique: true,
    custom: {
      icon: <VpnKeyOffIcon fontSize="small" />,
      verbose: 'Desbloquear formulario',
      message:
        'En esta acción validamos el formulario y se envía al perfil de negocio actual para que sea ' +
        'legalizado a través de ecertia.',
      hasMessage: true,
      isBack: true
    }
  },
  {
    field: 'state',
    source: [WorkflowForm.Assigned],
    target: WorkflowForm.Reviewed,
    roles: [ROLE.Admin, ROLE.Operator],
    permission: [ROLE.ChangeFormulario],
    unique: true,
    custom: {
      icon: <VerifiedIcon fontSize="small" />,
      verbose: 'Revisar, perfil de negocio.',
      message:
        'En esta acción validamos el formulario y se envía al perfil de negocio actual para que sea ' +
        'legalizado a través de ecertia.'
    }
  },
  {
    field: 'state',
    source: [WorkflowForm.Reviewed],
    target: WorkflowForm.Assigned,
    roles: [ROLE.Admin, ROLE.Official],
    permission: [ROLE.ChangeFormulario],
    custom: {
      icon: <UndoIcon fontSize="small" />,
      verbose: 'Regresar paso anterior.',
      message:
        'En esta acción validamos el formulario y se envía al perfil de negocio actual para que sea ' +
        'legalizado a través de ecertia.',
      hasMessage: true,
      isBack: true
    }
  },
  {
    field: 'state',
    source: [WorkflowForm.Reviewed],
    target: WorkflowForm.ReviewedOfficial,
    roles: [ROLE.Admin, ROLE.Official],
    permission: [ROLE.ChangeFormulario],
    custom: {
      icon: <VerifiedIcon fontSize="small" />,
      verbose: 'Revisar, oficial de cumplimiento.',
      message:
        'En esta acción validamos el formulario y se envía al oficial de cumplimiento para que sea ' +
        'legalizado a través de ecertia',
      hasMessage: true
    }
  },
  {
    field: 'state',
    source: [WorkflowForm.ReviewedOfficial],
    target: WorkflowForm.SendingClient,
    roles: [ROLE.Admin, ROLE.Official],
    permission: [ROLE.ChangeFormulario],
    custom: {
      icon: <MarkEmailReadIcon fontSize="small" />,
      verbose: 'Enviar legalizar por cliente',
      message:
        'En esta acción validamos el formulario y se envía al oficial de cumplimiento para que sea ' +
        'legalizado a través de ecertia'
    }
  },
  {
    field: 'state',
    source: [WorkflowForm.LegalizedClient],
    target: WorkflowForm.SendSivac,
    roles: [ROLE.Admin, ROLE.Official],
    permission: [ROLE.ChangeFormulario],
    custom: {
      icon: <SaveIcon fontSize="small" />,
      verbose: 'Guardar en Sivac',
      message:
        'En esta accion validamos el formulario y se envia al sistema Sicav para su registro'
    }
  },
  {
    field: 'state',
    source: [
      WorkflowForm.Created,
      WorkflowForm.Assigned,
      WorkflowForm.Reviewed,
      WorkflowForm.ReviewedOfficial,
      WorkflowForm.SendingClient,
      WorkflowForm.LegalizedClient,
      WorkflowForm.SendSivac
    ],
    target: WorkflowForm.CheckBlacklists,
    roles: [ROLE.Admin, ROLE.Official, ROLE.Operator],
    permission: [ROLE.ChangeFormulario],
    custom: {
      icon: <VerifiedIcon fontSize="small" />,
      verbose: 'Verificar en lista negras',
      message: 'En esta acción validamos el formulario con listas negras'
    }
  }
];
