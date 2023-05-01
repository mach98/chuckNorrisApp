import {TouchableOpacity, View, Text} from 'react-native';
import React, {FC} from 'react';
import styles from './JokeCategory.stylesheet';
import {JokeCategoryProps} from './JokeCategory.interface';

const JokeCategory: FC<JokeCategoryProps> = props => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View>
        <Text style={styles.catergoryText}>{props.category}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default JokeCategory;
