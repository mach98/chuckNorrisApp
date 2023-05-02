import {TouchableOpacity, View, Text} from 'react-native';
import React, {FC} from 'react';
import styles from './JokeCategory.stylesheet';
import {JokeCategoryProps} from './JokeCategory.interface';
import {ORANGE, WHITE} from '../../constants/COLORS';

const JokeCategory: FC<JokeCategoryProps> = ({
  onPress,
  category,
  selectedCategory,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: selectedCategory ? ORANGE : WHITE,
      }}
      onPress={onPress}>
      <View>
        <Text
          style={{
            ...styles.catergoryText,
            color: selectedCategory ? WHITE : ORANGE,
          }}>
          {category}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default JokeCategory;
