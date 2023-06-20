import axios from 'axios';
import {CategoryString} from '../types';

export const getVehiclesAPI = async (category: null | CategoryString) => {
  const params = {};
  if (category) {
    params['category'] = category;
  }
  const result = await axios
    .get(`https://644e16f71b4567f4d57f9ab7.mockapi.io/api/vehicles`, {params})
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log('getVehiclesAPI -->', error);
    });
  return result;
};

export const getVehicleByIdAPI = async (id: string) => {
  const result = await axios
    .get(`https://644e16f71b4567f4d57f9ab7.mockapi.io/api/vehicles/${id}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log('getVehicleByIdAPI -->', error);
    });
  return result;
};
