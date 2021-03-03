import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as RootNavigation from '../routes/routes';

import { View, Text, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { styles } from '../constants/styles';

const ChatPage = (props) => {
    const user = props.user;
    return (
        <View>
            <Text>Chat screen</Text>
        </View>
    )
}

const mapStateToProps = state => ({user: state.auth.user});

export default connect(mapStateToProps)(ChatPage);