import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Settings, VehicleDetails, VehicleList} from '../screens';
import {RootStackParamList} from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="VehicleList"
            component={VehicleList}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="VehicleDetails"
            component={VehicleDetails}
            options={({route}) => ({
              title: route?.params?.name,
              headerTitleAlign: 'center',
            })}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default RootNavigation;
