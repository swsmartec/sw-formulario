export const StepperNaturalCode = {
  General: 'general',
  Residencia: 'residencia',
  Financiera: 'financiera',
  Referencias: 'referencias',
  Peps: 'peps',
  Documentos: 'documentos',
  Comentario: 'comentario',
  ListaNegra: 'lista_negra',
  Envio: 'envio'
};

export const StepperNatural = [
  { value: StepperNaturalCode.General, label: 'Información General' },
  {
    value: StepperNaturalCode.Financiera,
    label: 'Información Financiera'
  },
  {
    value: StepperNaturalCode.Referencias,
    label: 'Referencias Bancarias'
  },
  { value: StepperNaturalCode.Peps, label: 'PEPS' },
  {
    value: StepperNaturalCode.Documentos,
    label: 'Documentos Habilitantes'
  },
  {
    value: StepperNaturalCode.Comentario,
    label: 'Observaciones '
  },
  {
    value: StepperNaturalCode.ListaNegra,
    label: 'Lista Negras'
  },
  {
    value: StepperNaturalCode.Envio,
    label: 'Trazabilidad'
  }
];
