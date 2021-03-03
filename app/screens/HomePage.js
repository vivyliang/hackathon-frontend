import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as RootNavigation from '../routes/routes';

//for bottom tab bar
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import CreateGoalPage from '../screens/CreateGoalPage';

//view stuff
import { View, Text, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { styles } from '../constants/styles';

function MessengerScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Messenger!</Text>
      </View>
    );
}
function GoalFeedScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Journey!</Text>
      </View>
    );
}
function AvatarScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Avatar!</Text>
      </View>
    );
}

function BottomTab({ state, descriptors, navigation }) {
    return (
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                if (route.name === 'CreateGoal') {
                    options.tabBarLabel = 
                    <View style={styles.singleTab}>
                        <Icon size={40} name='ios-medal-outline' type='ionicon' color='white' />
                        <Text style={styles.buttonText}>CURRENT</Text>
                        <Text style={styles.buttonText}>GOALS</Text>
                    </View>
                } else if (route.name === 'Messenger') {
                    options.tabBarLabel = 
                    <View style={styles.singleTab}>
                        <Icon size={40} name='ios-chatbubbles-outline' type='ionicon' color='white' />
                        <Text style={styles.buttonText}>MESSAGE</Text>
                        <Text style={styles.buttonText}>BUDDIES</Text>
                    </View>
                } else if (route.name === 'Journey') {
                    options.tabBarLabel = 
                    <View style={styles.singleTab}>
                        <Icon size={40} name='ios-golf-outline' type='ionicon' color='white' />
                        <Text style={styles.buttonText}>JOURNEY</Text>
                    </View>
                } else if (route.name === 'Avatar') {
                    options.tabBarLabel = 
                    <View style={styles.singleTab}>
                        <Icon size={40} name='ios-happy-outline' type='ionicon' color='white' />
                        <Text style={styles.buttonText}>VIEW</Text>
                        <Text style={styles.buttonText}>AVATAR</Text>
                    </View>
                }
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={options.tabBarTestID}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabView}
                    >
                        <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    )
}

const HomePage = (props) => {
    const user = props.auth.user;
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator tabBar={props => <BottomTab {...props} />}>
                <Tab.Screen name='CreateGoal' component={CreateGoalPage} />
                <Tab.Screen name='Messenger' component={MessengerScreen} />
                <Tab.Screen name='Journey' component={GoalFeedScreen} />
                <Tab.Screen name='Avatar' component={AvatarScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(HomePage);