import {View, TextInput} from 'react-native';
import React, {FC} from 'react';
import styles from './SearchBar.stylesheet';
import {ISearchBar} from './SearchBar.interface';
import SearchBarIcon from 'react-native-vector-icons/Feather';
import {WHITE} from '../../constants/COLORS';

const SearchBar: FC<ISearchBar> = ({
  search,
  onSearchChange,
  onSearchSubmit,
}) => {
  return (
    <View style={styles.container}>
      <SearchBarIcon name="search" style={styles.searchBarIconStyle} />
      <TextInput
        placeholder="Search for jokes here"
        placeholderTextColor={WHITE}
        onChangeText={text => onSearchChange(text)}
        value={search}
        style={styles.searchBar}
        onEndEditing={onSearchSubmit}
      />
    </View>
  );
};

export default SearchBar;
