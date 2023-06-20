import {useReducer} from 'react';
import {InitialStateType} from '../types';

type Action = {
  type:
    | 'SELECT_VEHICLE'
    | 'TOGGLE_CHECKBOX'
    | 'ADD_VEHICLE'
    | 'ADD_FILTERED_VEHICLE';
  payload: any;
};

const initialState = {
  selectedVehicle: {
    driverName: '',
    driverNumber: '',
    category: '',
  },
  checkbox: {
    isChoosedCargo: true,
    isChoosedPassenger: true,
    isChoosedSpecial: true,
  },
  vehicleList: [],
  filteredVehicleList: [],
};

export default () => {
  const reducer = (state: InitialStateType, action: Action) => {
    switch (action.type) {
      case 'ADD_VEHICLE':
        return {
          ...state,
          vehicleList: action.payload,
        };
      case 'ADD_FILTERED_VEHICLE':
        return {
          ...state,
          filteredVehicleList: action.payload,
        };
      case 'SELECT_VEHICLE':
        return {
          ...state,
          selectedVehicle: action.payload,
        };
      case 'TOGGLE_CHECKBOX':
        return {
          ...state,
          chechbox: {...state.checkbox, ...action.payload},
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  return {
    state,
    dispatch,
  };
};
