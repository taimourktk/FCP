import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';

import { StackNavigator } from  'react-navigation';

const MainScreen = () => <Text>Main</Text>
const DetailScreen = () => <Text>Detail</Text>

const Navigation = StackNavigator({
  Main : {
    screen: MainScreen,
    navigationOptions: ({navigation}) => ({
      title: "Main",
      headerLeft:(<TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
                    <IOSIcon name="ios-menu" size={30} />
                  </TouchableOpacity>
      ),
      headerStyle: { paddingRight: 10, paddingLeft: 15 }
    })
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: ({navigation}) => ({
      title: "Detail",
    })     
  }
});

export default Navigation;