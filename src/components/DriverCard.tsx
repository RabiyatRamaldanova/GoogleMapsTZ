import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AppContext} from '../../App';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import {getVehicleByIdAPI} from '../api';

interface Props {
  category: string;
  driverName: string;
  id: string;
}

type VehicleListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'VehicleList'
>;

const DriverCard = ({category, driverName, id}: Props) => {
  const {t} = useTranslation();
  const {dispatch} = useContext(AppContext);
  const navigation = useNavigation<VehicleListScreenNavigationProp>();

  const handleOnPress = () => {
    navigation.navigate('VehicleDetails', {
      name: `${t('VEHICLE').toUpperCase()} #${id}`,
    });
    getVehicleByIdAPI(id).then(response =>
      dispatch({type: 'SELECT_VEHICLE', payload: response}),
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleOnPress}>
      <View style={{paddingHorizontal: 10}}>
        <Text style={styles.titleText}>
          {t('VEHICLE')} #{id}
        </Text>
        <Text style={styles.descriptionText}>{driverName}</Text>
        <Text>{t(category.toUpperCase())}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DriverCard;

const styles = StyleSheet.create({
  container: {
    width: 350,
    backgroundColor: 'white',
    paddingBottom: 10,
    marginVertical: 5,
    elevation: 1,
    shadowColor: '#485563',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.65,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    paddingVertical: 5,
    width: 330,
    textTransform: 'uppercase',
  },
  categoryText: {fontSize: 13, color: 'black'},
  categoryContainer: {
    backgroundColor: 'rgba(72, 85, 99, 0.5)',
    height: 20,
    width: 100,
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 5,
  },
  platformCategoryContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 10,
  },
  descriptionText: {
    fontSize: 15,
    color: 'black',
    width: 330,
  },
  image: {height: 200, width: 350},
});
