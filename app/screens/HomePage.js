import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as RootNavigation from '../routes/routes';

//view stuff
import { View, Text, ImageBackground,TouchableOpacity, Dimensions } from 'react-native';
import { styles } from '../constants/styles';

const HomePage = (props) => {
    const user = props.auth.user;
    return (
        <View style={styles.container}>
            <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => {
                        RootNavigation.navigate("CreateGoal");
                    }} >
                        <Text style={styles.buttonText}>Set Goals</Text>
                </TouchableOpacity>
        </View>
    )
}

const mapStateToProps = state => ({auth: state.auth});

export default connect(mapStateToProps)(HomePage);