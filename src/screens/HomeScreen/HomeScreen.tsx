import {View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import React, {useEffect, useState, FC, useCallback, useMemo} from 'react';
import axios from 'axios';
import styles from './HomeScreen.stylesheet';
import Jokes from '../../components/Jokes/Jokes';
import JokeCategory from '../../components/JokeCategory/JokeCategory';
import {IHomeScreenProps} from './HomeScreen.interface';

const JOKES = 'https://api.chucknorris.io/jokes/';

const HomeScreen: FC<IHomeScreenProps> = () => {
  const [jokes, setJokes] = useState<IHomeScreenProps[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [joke, setJoke] = useState('');

  const searchJokes = useCallback(async () => {
    if (!search) {
      return;
    }
    const response = await axios.get(`${JOKES}search?query=${search}`);
    setJokes(response.data.result);
    setIsSearch(true);
  }, [search]);

  const onSelectCategory = useCallback(async (category: string) => {
    const response = await axios.get(`${JOKES}random?category=${category}`);
    setJoke(response.data.value);
    console.log(response.data);
    setIsSearch(false);
  }, []);

  const categoryList = useMemo(
    () => (
      <FlatList
        data={categories}
        renderItem={({item}) => (
          <JokeCategory
            category={item}
            onPress={() => onSelectCategory(item)}
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
        axios.get(`${JOKES}random`),
        axios.get(`${JOKES}categories`),
      ]);
      setJokes(response.data.value);
      setCategories(responseCategories.data);
    };
    fetchData();
  }, []);

  return (
    <View style={{margin: 10}}>
      <Text style={{alignItems: 'center', justifyContent: 'center'}}>
        Chuck Norris Jokes
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <TextInput
          placeholder="Search any jokes here"
          onChangeText={text => setSearch(text)}
          value={search}
          style={{backgroundColor: '#677791', width: '80%'}}
        />
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 15,
            marginHorizontal: 10,
            backgroundColor: '#33435c',
          }}
          onPress={searchJokes}>
          <View>
            <Text>GO</Text>
          </View>
        </TouchableOpacity>
      </View>
      {categoryList}
      {isSearch ? (
        <FlatList
          data={jokes}
          renderItem={({item}) => <Jokes joke={item.value} />}
          keyExtractor={item => item.id}
        />
      ) : joke ? (
        <Jokes joke={joke} />
      ) : null}
    </View>
  );
};

export default HomeScreen;
