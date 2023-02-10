export interface IAccion {
  Module: string;
  View: boolean;
  Add: boolean;
  Change: boolean;
  Delete: boolean;
}

export interface IRolAccion {
  AccionId: number;
  Module: string;
  Codigo: string;
  Nombre: string;
}

export interface IPermiso {
  RolId: number;
  Nombre: string;
  Codigo: string;
  RolesAciones: IRolAccion[];
  Acciones: IAccion[];
}

export interface IPermisoState {
  loading: boolean;
  listResult: IPermiso[];
  selectedResult: IPermiso;
  isNew: boolean;
  isEdit: boolean;
  isDelete: boolean;
}

export interface IPermisoContext extends IPermisoState {
  setCurrentResult: (result: IPermiso) => void;
  changeNew: (state: boolean) => void;
  createRegister: (data: IPermiso) => void;
  changeEdit: (state: boolean) => void;
  updateRegister: (data: IPermiso) => void;
  changeDelete: (state: boolean) => void;
  deleteRegister: (id: number) => void;
}
