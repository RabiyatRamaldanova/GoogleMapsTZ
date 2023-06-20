import React, {useContext} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppContext} from '../../App';
import {
  CargoIcon,
  PassengerVehicleIcon,
  PhoneIcon,
  SpecialVehicleIcons,
  WhatsappIcon,
} from '../assets';
import {useTranslation} from 'react-i18next';
import {Linking} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {CategoryString} from '../types';

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

const VehicleDetails = () => {
  const {state} = useContext(AppContext);
  const {t} = useTranslation();
  const {selectedVehicle} = state;
  const handleOnCallByPhone = () => {
    Linking.openURL(`tel:${selectedVehicle.contactNumber}`);
  };
  const handleOnConnectByWP = () => {
    Linking.openURL(
      `whatsapp://send?text=Добрый день, подскажите пожалуйста, какой номер заказа у вас сейчас в работе&phone=${selectedVehicle.contactNumber}`,
    );
  };
  console.log(selectedVehicle, 'selectedVehicle');

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 10}}>
        <Text style={styles.text}>
          {t('CATEGORY')}: {selectedVehicle.category}
        </Text>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {t('DRIVER_NAME')}: {selectedVehicle.driverName}
        </Text>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {t('CONTACT_NUMBER')}: {selectedVehicle.contactNumber}
        </Text>
        <View style={styles.phoneButtonsContainer}>
          <TouchableOpacity onPress={handleOnConnectByWP}>
            <WhatsappIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={{paddingHorizontal: 15}}
            onPress={handleOnCallByPhone}>
            <PhoneIcon />
          </TouchableOpacity>
        </View>
      </View>
      {selectedVehicle?.location?.latitude ? (
        <MapView
          loadingEnabled
          style={[styles.map, {height: Dimensions.get('window').height - 50}]}
          provider={PROVIDER_GOOGLE}
          showsPointsOfInterest
          showsMyLocationButton
          minZoomLevel={5}
          region={{
            latitude: selectedVehicle.location.latitude,
            longitude: selectedVehicle.location.longitude,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}>
          <Marker
            key={selectedVehicle.id}
            coordinate={{
              latitude: selectedVehicle.location.latitude,
              longitude: selectedVehicle.location.longitude,
            }}
            tracksViewChanges={false}>
            <View style={{width: 40, height: 56}}>
              {VehicleIcon(selectedVehicle.category)}
            </View>
          </Marker>
        </MapView>
      ) : (
        <></>
      )}
    </View>
  );
};

export default VehicleDetails;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F9F9FA'},
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#485563',
    paddingVertical: 5,
    width: 330,
  },
  phoneButtonsContainer: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  map: {
    width: '100%',
  },
});
