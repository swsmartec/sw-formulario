export interface BaseFormProps {
  formField: any;
  handleUpdateForm: (x: any) => void;
}

export type State = 'completed' | 'pending' | 'failed';
