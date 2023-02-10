export interface ICatalogo {
  ListaSeleccionId: number;
  Nombre: string;
  Valor: string;
  Ambito: string;
  Descripcion: string;
}

export interface ICatalogoState {
  loading: boolean;
  listResult: ICatalogo[];
  selectedResult: ICatalogo;
  isNew: boolean;
  isEdit: boolean;
  isDelete: boolean;
}

export interface ICatalogoContext extends ICatalogoState {
  setCurrentResult: (result: ICatalogo) => void;
  changeNew: (state: boolean) => void;
  createRegister: (data: ICatalogo) => void;
  changeEdit: (state: boolean) => void;
  updateRegister: (data: ICatalogo) => void;
  changeDelete: (state: boolean) => void;
  deleteRegister: (id: number) => void;
}

export interface ICatalogoService {
  ITC_ID: number;
  ITC_NOMBRE: string;
}
