import { ICatalogo, ICatalogoService } from 'interfaces/Catalogo';

export interface IFormularioEnvio {
  FormularioEnvioId: number;
  FechaInicio: Date;
  FechaFin: Date;
  EstadoInicioId: number;
  EstadoFinId: number;
  CodigoUid: string;
  Comentario?: string;
}

export interface IFormulario {
  FormularioId: number;
  EstadoId: number;
  TipoFormularioId: number;
  Identificacion: string;
  RazonSocial: string;
  DetalleFormulario: string;
  Estado: ICatalogo;
  TipoFormulario: ICatalogo;
  ObjectDetalle?: object;
  Envio?: IFormularioEnvio[];
  Observaciones?: String;
  OperadorId?: number;
  DetalleListaNegras?: string;
}

export interface IFormularioState {
  loading: boolean;
  listResult: IFormulario[];
  selectedResult: IFormulario;
  listCatalogoServicio: ICatalogoService[];
  isNew: boolean;
  isEdit: boolean;
  isDelete: boolean;
  isList: boolean;
}

export interface IFormularioContext extends IFormularioState {
  setCurrentResult: (result: IFormulario) => void;
  changeNew: (state: boolean) => void;
  createRegister: (data: IFormulario) => void;
  changeEdit: (state: boolean) => void;
  updateRegister: (data: IFormulario) => void;
  changeDelete: (state: boolean) => void;
  deleteRegister: (id: number) => void;
  setListCatalogo: (c: any) => void;
  changeList: (state: boolean) => void;
}

export interface IFieldProps {
  field: any;
  xs?: number;
  sm?: number;
  children: any;
}
export interface IBaseFieldProps {
  field: any;
}
