import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import DriverCard from '../components/DriverCard';
import {CategoryString, RootStackParamList, VehicleItem} from '../types';
import {
  CargoIcon,
  PassengerVehicleIcon,
  SettingsIcon,
  SpecialVehicleIcons,
} from '../assets';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {VehicleTypeCheckboxes} from '../components';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {getVehiclesAPI} from '../api';
import {AppContext} from '../../App';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type VehicleListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'VehicleList'
>;

const renderItem = ({item}: {item: VehicleItem}) => (
  <DriverCard
    category={item.category}
    driverName={item.driverName}
    id={item.id}
  />
);

const VehicleIcon = (category: CategoryString) => {
  switch (category) {
    case 'cargo':
      return <CargoIcon />;
    case 'passenger':
      return <PassengerVehicleIcon />;
    case 'special':
      return <SpecialVehicleIcons />;
    default:
      return <></>;
  }
};

const VehicleList = () => {
  const navigation = useNavigation<VehicleListScreenNavigationProp>();
  const {t} = useTranslation();
  const {state, dispatch} = useContext(AppContext);
  const insets = useSafeAreaInsets();
  const {filteredVehicleList} = state;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handelOnPressSettings = () => {
    navigation.navigate('Settings');
  };

  const getMapRegion = () => {
    let minLat = filteredVehicleList[0]?.location.latitude;
    let maxLat = filteredVehicleList[0]?.location.latitude;
    let minLng = filteredVehicleList[0]?.location.longitude;
    let maxLng = filteredVehicleList[0]?.location.longitude;

    filteredVehicleList.forEach(point => {
      minLat = Math.min(minLat, point.location.latitude);
      maxLat = Math.max(maxLat, point.location.latitude);
      minLng = Math.min(minLng, point.location.longitude);
      maxLng = Math.max(maxLng, point.location.longitude);
    });

    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;
    const latDelta = Math.abs(maxLat - minLat) + 0.1;
    const lngDelta = Math.abs(maxLng - minLng) + 0.1;
    return {
      latitude: centerLat,
      longitude: centerLng,
      latitudeDelta: latDelta,
      longitudeDelta: lngDelta,
    };
  };

  useEffect(() => {
    getVehiclesAPI(null).then(responseData => {
      dispatch({type: 'ADD_VEHICLE', payload: responseData});
      dispatch({type: 'ADD_FILTERED_VEHICLE', payload: responseData});
    });
  }, [dispatch]);

  return (
    <View style={[styles.container, {top: insets.top}]}>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={handelOnPressSettings}>
        <SettingsIcon />
      </TouchableOpacity>
      <View style={styles.switchButtonContainer}>
        <Text style={styles.switchButtonText}>{t('SHOW_ON_MAPS')}:</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <VehicleTypeCheckboxes />
      {!isEnabled ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{marginTop: 10}}
          renderItem={renderItem}
          data={filteredVehicleList}
        />
      ) : (
        <>
          {filteredVehicleList.length > 0 ? (
            <MapView
              loadingEnabled
              style={[
                styles.map,
                {height: Dimensions.get('window').height - 50},
              ]}
              provider={PROVIDER_GOOGLE}
              showsPointsOfInterest
              showsMyLocationButton
              initialRegion={getMapRegion()}>
              {filteredVehicleList?.map(item => (
                <Marker
                  key={item.id}
                  coordinate={{
                    latitude: item.location.latitude,
                    longitude: item.location.longitude,
                  }}
                  tracksViewChanges={false}>
                  <View style={{width: 30, height: 46}}>
                    {VehicleIcon(item.category)}
                  </View>
                </Marker>
              ))}
            </MapView>
          ) : (
            <></>
          )}
        </>
      )}
    </View>
  );
};

export default VehicleList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F9F9FA',
  },
  map: {
    width: '100%',
  },
  switchButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 30,
    alignItems: 'center',
    paddingLeft: 10,
    width: '100%',
  },
  switchButtonText: {color: '#485563'},
  settingsButton: {position: 'absolute', bottom: 30, right: 10, zIndex: 10},
});
