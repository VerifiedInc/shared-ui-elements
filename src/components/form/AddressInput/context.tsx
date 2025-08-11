import { createContext, useContext, ReactNode } from 'react';

interface AddressInputContextType {
  googlePlacesAutocompletePlaces?: string;
  googlePlacesGetPlace?: string;
}

const defaultContextValue: AddressInputContextType = {
  googlePlacesAutocompletePlaces: undefined,
  googlePlacesGetPlace: undefined,
};

export const AddressInputContext =
  createContext<AddressInputContextType>(defaultContextValue);

interface AddressInputProviderProps {
  children: ReactNode;
  googlePlacesAutocompletePlaces?: string;
  googlePlacesGetPlace?: string;
}

export function AddressInputProvider({
  children,
  googlePlacesAutocompletePlaces,
  googlePlacesGetPlace,
}: AddressInputProviderProps) {
  return (
    <AddressInputContext.Provider
      value={{
        googlePlacesAutocompletePlaces,
        googlePlacesGetPlace,
      }}
    >
      {children}
    </AddressInputContext.Provider>
  );
}

export function useAddressInputContext() {
  const context = useContext(AddressInputContext);

  if (context === undefined) {
    throw new Error(
      'useAddressInputContext must be used within an AddressInputProvider',
    );
  }

  return context;
}
