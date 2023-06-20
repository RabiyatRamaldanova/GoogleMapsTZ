import React, {FC, ReactElement} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface Props {
  label: string;
  selected: boolean;
  onPress?: Function | null;
}

const RadioButton: FC<Props> = ({
  label,
  selected,
  onPress,
}: Props): ReactElement => {
  const handleOnPress = () => {
    if (onPress && typeof onPress === 'function') {
      onPress();
    }
  };

  return (
    <Pressable style={styles.container} onPress={() => handleOnPress()}>
      <Text
        numberOfLines={1}
        style={[
          // eslint-disable-next-line no-nested-ternary
          selected
            ? onPress
              ? styles.activeLabel
              : {...styles.activeLabel, color: 'green'}
            : styles.inactiveLabel,
        ]}>
        {label}
      </Text>
      <View
        style={[
          // eslint-disable-next-line no-nested-ternary
          selected
            ? onPress
              ? styles.activeButtonBorder
              : {...styles.activeButtonBorder, borderColor: 'green'}
            : styles.inactiveButtonBorder,
        ]}>
        <View
          style={[
            // eslint-disable-next-line no-nested-ternary
            selected
              ? onPress
                ? styles.activeNestedView
                : {...styles.activeNestedView, backgroundColor: 'green'}
              : styles.inactiveNestedView,
          ]}
        />
      </View>
    </Pressable>
  );
};

export default RadioButton;

RadioButton.defaultProps = {
  onPress: null,
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 50,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeLabel: {
    fontSize: 13,
    lineHeight: 14,
    textAlign: 'center',
    marginLeft: 0,
    color: '#87CEEB',
    marginBottom: 14,
  },
  inactiveLabel: {
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'center',
    marginLeft: 0,
    color: 'black',
    marginBottom: 14,
  },
  activeButtonBorder: {
    borderWidth: 0.5,
    borderRadius: 24,
    borderColor: '#87CEEB',
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveButtonBorder: {
    borderWidth: 1,
    borderRadius: 24,
    borderColor: '#87CEEB',
  },
  activeNestedView: {
    backgroundColor: '#87CEEB',
    width: 12,
    height: 12,
    borderRadius: 12,
  },
  inactiveNestedView: {
    backgroundColor: 'white',
    width: 24,
    height: 24,
    borderRadius: 24,
  },
});
