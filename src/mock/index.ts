import {VehicleItem} from '../types';

export const mock: Array<VehicleItem> = [
  {
    id: '1',
    name: 'ТС #1',
    driverName: 'Иван Иванов',
    category: 'cargo',
    location: {
      latitude: 51.12345,
      longitude: 45.6789,
    },
    contactNumber: '+1234567890',
  },
  {
    id: '2',
    name: 'ТС #2',
    driverName: 'Петр Петров',
    category: 'passenger',
    location: {
      latitude: 52.54321,
      longitude: 47.89012,
    },
    contactNumber: '+9876543210',
  },
  {
    id: '3',
    name: 'ТС #3',
    driverName: 'Петр Петров',
    category: 'special',
    location: {
      latitude: 52.5561,
      longitude: 45.6789,
    },
    contactNumber: '+9876543210',
  },
  // {
  //   id: '4',
  //   name: 'ТС #4',
  //   driverName: 'Петр Иванов',
  //   category: 'special',
  //   location: {
  //     latitude: 34.0522,
  //     longitude: -118.2437,
  //   },
  //   contactNumber: '+9876543210',
  // },
];
