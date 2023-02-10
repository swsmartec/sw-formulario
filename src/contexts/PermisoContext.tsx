import { createContext, ReactNode } from 'react';
import { usePermiso } from '@/contexts/hooks/usePermiso';
import { IPermisoContext } from 'interfaces/Permiso';

export const PermisoContext = createContext<IPermisoContext>(
  {} as IPermisoContext
);

type Props = {
  children: ReactNode;
};

export function PermisoProvider({ children }: Props) {
  const {
    loading,
    listResult,
    selectedResult,
    isNew,
    isEdit,
    isDelete,

    setCurrentResult,
    changeNew,
    createRegister,
    changeEdit,
    updateRegister,
    changeDelete,
    deleteRegister
  } = usePermiso();

  return (
    <PermisoContext.Provider
      value={{
        loading,
        listResult,
        selectedResult,
        isNew,
        isEdit,
        isDelete,

        setCurrentResult,
        changeNew,
        createRegister,
        changeEdit,
        updateRegister,
        changeDelete,
        deleteRegister
      }}
    >
      {children}
    </PermisoContext.Provider>
  );
}
