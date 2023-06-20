import CheckBox from '@react-native-community/checkbox';
import React, {useContext, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AppContext} from '../../App';
import {useTranslation} from 'react-i18next';
import {CategoryString} from '../types';

const VehicleTypeCheckboxes = () => {
  const {state, dispatch} = useContext(AppContext);
  const {t} = useTranslation();
  const {checkbox, vehicleList} = state;
  const [isChoosedCargo, setIsChoosedCargo] = useState<boolean>(
    checkbox.isChoosedCargo,
  );
  const [isChoosedPassenger, setIsChoosedPassenger] = useState<boolean>(
    checkbox.isChoosedPassenger,
  );
  const [isChoosedSpecial, setIsChoosedSpecial] = useState<boolean>(
    checkbox.isChoosedSpecial,
  );
  const handleOnApply = () => {
    dispatch({
      type: 'TOGGLE_CHECKBOX',
      payload: {
        isChoosedCargo,
        isChoosedPassenger,
        isChoosedSpecial,
      },
    });

    const selectedCategories: Array<CategoryString> = [];

    if (isChoosedCargo) {
      selectedCategories.push('cargo');
    }

    if (isChoosedPassenger) {
      selectedCategories.push('passenger');
    }

    if (isChoosedSpecial) {
      selectedCategories.push('special');
    }

    const filteredList = vehicleList.filter(item => {
      return selectedCategories.includes(item.category);
    });
    dispatch({type: 'ADD_FILTERED_VEHICLE', payload: filteredList});
  };

  return (
    <>
      <View style={styles.checkBoxGroupContainer}>
        <View style={styles.checkBoxcontainer}>
          <CheckBox
            disabled={false}
            value={isChoosedCargo}
            onValueChange={newValue => setIsChoosedCargo(newValue)}
          />
          <Text style={styles.checkbpxText}>{t('CARGO')}</Text>
        </View>
        <View style={styles.checkBoxcontainer}>
          <CheckBox
            disabled={false}
            value={isChoosedPassenger}
            onValueChange={newValue => setIsChoosedPassenger(newValue)}
          />
          <Text style={styles.checkbpxText}>{t('PASSENGER')}</Text>
        </View>
        <View style={styles.checkBoxcontainer}>
          <CheckBox
            disabled={false}
            value={isChoosedSpecial}
            onValueChange={newValue => setIsChoosedSpecial(newValue)}
          />
          <Text style={styles.checkbpxText}>{t('SPECIAL')}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.applyButton}
        onPress={() => handleOnApply()}>
        <Text style={styles.applyButtonText}>{t('APPLY')}</Text>
      </TouchableOpacity>
    </>
  );
};

export default VehicleTypeCheckboxes;

const styles = StyleSheet.create({
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
    marginVertical: 10,
  },
  checkBoxcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 3,
  },
  checkBoxGroupContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-around',
  },
  checkbpxText: {color: '#485563', marginLeft: 5},
});
