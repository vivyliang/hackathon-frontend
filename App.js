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
import HomePage from './app/screens/HomePage';
import CreateGoalPage from "./app/screens/CreateGoalPage";
import GoalsPage from "./app/screens/GoalsPage";
import ChatPage from "./app/screens/ChatPage";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Register" component={RegisterPage} />
            <Stack.Screen name="CreateCharacter" component={CreateCharacterPage} />
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="CreateGoal" component={CreateGoalPage} />
            {/* <Stack.Screen name="Goals" component={GoalsPage} /> */}
            <Stack.Screen name="Chat" component={ChatPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}