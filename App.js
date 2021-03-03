import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from './app/store/store';

const Stack = createStackNavigator();

//Navigation stuff
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './app/routes/routes';

//Screen components
import LoginPage from './app/screens/LoginPage';
import RegisterPage from './app/screens/RegisterPage';
import CreateCharacterPage from './app/screens/CreateCharacterPage';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Register" component={RegisterPage} />
            <Stack.Screen name="CreateCharacter" component={CreateCharacterPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}