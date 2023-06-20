import React, {createContext} from 'react';
import RootNavigation from './src/navigation';
import useAppReducer from './src/hooks/useAppReducer';
import {CategoryString, InitialStateType} from './src/types';

const initialState = {
  selectedVehicle: {
    id: '',
    name: '',
    driverName: '',
    category: '' as CategoryString,
    location: {
      latitude: 0,
      longitude: 0,
    },
    contactNumber: '',
  },
  checkbox: {
    isChoosedCargo: true,
    isChoosedPassenger: true,
    isChoosedSpecial: true,
  },
  vehicleList: [],
  filteredVehicleList: [],
};

export const AppContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const App = () => {
  const {state, dispatch} = useAppReducer();

  return (
    <AppContext.Provider value={{state, dispatch}}>
      <RootNavigation />
    </AppContext.Provider>
  );
};

export default App;
