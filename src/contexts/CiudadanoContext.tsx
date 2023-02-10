import { useCiudadano } from '@/contexts/hooks/useCiudadano';
import { ICiudadanoContext } from 'interfaces/Ciudadano';
import { createContext, ReactNode } from 'react';

export const CiudadanoContext = createContext<ICiudadanoContext>(
  {} as ICiudadanoContext
);

type Props = {
  children: ReactNode;
};

export function CiudadanoProvider({ children }: Props) {
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
  } = useCiudadano();

  return (
    <CiudadanoContext.Provider
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
    </CiudadanoContext.Provider>
  );
}
