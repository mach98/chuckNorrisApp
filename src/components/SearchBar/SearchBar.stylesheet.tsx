import {StyleSheet} from 'react-native';
import {ORANGE, WHITE} from '../../constants/COLORS';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: ORANGE,
    borderRadius: 5,
  },
  searchBar: {
    flex: 1,
    color: WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchButtonText: {
    color: WHITE,
    fontWeight: 'bold',
    fontSize: 18,
  },
  searchBarIconStyle: {
    color: WHITE,
    fontSize: 30,
    alignSelf: 'center',
    marginHorizontal: 10,
  },
});

export default styles;
