import { useCatalogo } from '@/contexts/hooks/useCatalogo';
import { ICatalogoContext } from 'interfaces/Catalogo';
import { createContext, ReactNode } from 'react';

export const CatalogoContext = createContext<ICatalogoContext>(
  {} as ICatalogoContext
);

type Props = {
  children: ReactNode;
};

export function CatalogoProvider({ children }: Props) {
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
  } = useCatalogo();

  return (
    <CatalogoContext.Provider
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
    </CatalogoContext.Provider>
  );
}
