import * as React from 'react';
import { Text, View, StyleSheet,Image } from 'react-native';
import{createAppContainer}from 'react-navigation';
import {createBottomTabNavigator}from 'react-navigation-tabs';
import Transaction from './screens/transcation';
import Search from './screens/search'
import Constants from 'expo-constants';



export default function App() {
  return (
    <AppContainer/>
  );
}
const TabNavigator = createBottomTabNavigator({
  Transaction: {screen: Transaction},
  Search: {screen: Search},
},
{
  defaultNavigationOptions: ({navigation})=>({
    tabBarIcon: ()=>{
      const routeName = navigation.state.routeName;
      console.log(routeName)
      if(routeName === "Transaction"){
        return(
          <Image
          source={require("./assets/book.png")}
          style={{width:40, height:40}}
        />
        )
        
      }
      else if(routeName === "Search"){
        return(
          <Image
          source={require("./assets/searchingbook.png")}
          style={{width:40, height:40}}
        />)
        
      }
    }
  })
}
);

const AppContainer=createAppContainer(TabNavigator)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
