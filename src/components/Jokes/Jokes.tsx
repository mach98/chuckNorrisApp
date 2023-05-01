import {View, Text} from 'react-native';
import React, {FC} from 'react';
import {IJokes} from './Jokes.interface';
import styles from './Jokes.stylesheet';

const Jokes: FC<IJokes> = ({joke}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{joke}</Text>
    </View>
  );
};

export default Jokes;
