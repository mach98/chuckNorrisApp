import {View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import React, {useEffect, useState, FC, useCallback, useMemo} from 'react';
import axios from 'axios';
import styles from './HomeScreen.stylesheet';
import Jokes from '../../components/Jokes/Jokes';
import JokeCategory from '../../components/JokeCategory/JokeCategory';
import {IHomeScreenProps} from './HomeScreen.interface';
import {JOKES_URL} from '../../constants/URLS';
import SearchBar from '../../components/SearchBar/SearchBar';

const HomeScreen: FC = () => {
  const [jokes, setJokes] = useState<IHomeScreenProps[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [joke, setJoke] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const searchJokes = useCallback(async () => {
    if (!search) {
      setErrorMessage('Please enter a search query!');
      return;
    }
    try {
      const response = await axios.get(`${JOKES_URL}search?query=${search}`);
      setJokes(response.data.result);
      setIsSearch(true);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Something went wrong!!!');
    }
  }, [search]);

  const onSelectCategory = useCallback(
    async (category: string) => {
      try {
        const response = await axios.get(
          `${JOKES_URL}random?category=${category}`,
        );
        setIsSearch(false);
        setJoke(response.data.value);
        setSelectedCategory(category);
      } catch (error) {
        console.log(error);
      }
    },
    [selectedCategory],
  );

  const categoryList = useMemo(
    () => (
      <FlatList
        data={categories}
        renderItem={({item}) => (
          <JokeCategory
            category={item}
            onPress={() => onSelectCategory(item)}
            selectedCategory={selectedCategory === item}
          />
        )}
        keyExtractor={item => item}
        numColumns={4}
      />
    ),
    [categories, onSelectCategory],
  );

  useEffect(() => {
    const fetchData = async () => {
      const [response, responseCategories] = await Promise.all([
        axios.get(`${JOKES_URL}random`),
        axios.get(`${JOKES_URL}categories`),
      ]);
      setJokes(response.data.value);
      setCategories(responseCategories.data);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Chuck Norris Jokes</Text>
      <SearchBar
        search={search}
        onSearchChange={newSearch => setSearch(newSearch)}
        onSearchSubmit={searchJokes}
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}

      {categoryList}

      <View style={styles.displayJokes}>
        {isSearch && search.length > 0 ? (
          <FlatList
            data={jokes}
            renderItem={({item}) => <Jokes joke={item.value} />}
            keyExtractor={item => item.id}
          />
        ) : jokes ? (
          <Jokes joke={joke} />
        ) : null}
      </View>
    </View>
  );
};

export default HomeScreen;
