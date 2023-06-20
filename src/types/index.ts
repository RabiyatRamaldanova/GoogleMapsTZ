export type InitialStateType = {
  selectedVehicle: VehicleItem;
  checkbox: {
    isChoosedCargo: boolean;
    isChoosedPassenger: boolean;
    isChoosedSpecial: boolean;
  };
  vehicleList: Array<VehicleItem>;
  filteredVehicleList: Array<VehicleItem>;
};

enum Category {
  'cargo',
  'passenger',
  'special',
}

export type CategoryString = keyof typeof Category;
export type VehicleItem = {
  id: string;
  name: string;
  driverName: string;
  category: CategoryString;
  location: {
    latitude: number;
    longitude: number;
  };
  contactNumber: string;
};

export type RootStackParamList = {
  VehicleList: undefined;
  VehicleDetails: {name: string};
  Settings: undefined;
};
