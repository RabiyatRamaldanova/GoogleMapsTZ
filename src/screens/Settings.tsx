import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import RadioButton from '../components/RadioButton';
import {useTranslation} from 'react-i18next';
import i18next from 'i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';

const languages = ['en', 'ru'];

type SettingsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Settings'
>;

const Settings = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const [radioButtonValue, setRadioButtonValue] = useState<'en' | 'ru'>(
    i18next.language as 'ru' | 'en',
  );
  const handleOnChooseLanguage = () => {
    navigation.navigate('VehicleList');
    if (radioButtonValue === languages[1]) {
      return i18next.changeLanguage('ru');
    }
    return i18next.changeLanguage('en');
  };

  return (
    <View style={styles.container}>
      <View style={styles.radioButtonsContainer}>
        <RadioButton
          key={'english'}
          label={t('ENGLISH')}
          selected={radioButtonValue === 'en'}
          onPress={() => setRadioButtonValue('en')}
        />
        <RadioButton
          key={'russian'}
          label={t('RUSSIAN')}
          selected={radioButtonValue === 'ru'}
          onPress={() => setRadioButtonValue('ru')}
        />
      </View>
      <TouchableOpacity
        style={styles.applyButton}
        onPress={() => handleOnChooseLanguage()}>
        <Text style={styles.applyButtonText}>{t('APPLY')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', backgroundColor: '#F9F9FA'},
  radioButtonsContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-around',
    width: '100%',
  },
  applyButtonText: {
    textTransform: 'uppercase',
    color: '#485563',
    fontSize: 16,
  },
  applyButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#87CEEB',
    height: 25,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
