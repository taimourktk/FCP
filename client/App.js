/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import styles from './App.style'

import Login from './components/Login/Login.Component'
import SignUp from './components/SignUp/SignUp.Component'
import Home from './components/Home/Home.Component'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {get} from './utils/storage';
import user from './utils/user'

const App = () => {

  const [loggedIn, setLoggedIn] = React.useState();
  const [screen, setScreen] = React.useState('login');

  React.useEffect(() => {

    get('token').then(async token => {
      if (token && token !== 'null') {
        let userData = await get('user');
        user.setData(userData);
        setLoggedIn(true);
      }
    })

  }, [loggedIn])

  return (
    <SafeAreaProvider>
    <SafeAreaView>
      <View style={styles.container}>
      {
        loggedIn ?
        <Home reload={() => setLoggedIn(false)} />:
        screen === 'login' ?
        <Login reload={() => setLoggedIn(true)} setScreen={setScreen}/>
        : <SignUp reload={() => setLoggedIn(true)} setScreen={setScreen}/>
      }
      </View>
    </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
