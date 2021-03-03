import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as RootNavigation from '../routes/routes';
import { io } from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';

import { View, Text, ImageBackground, TouchableOpacity, Dimensions, KeyboardAvoidingView } from 'react-native';
import { styles } from '../constants/styles';
import { Icon } from 'react-native-elements';

class ChatPage extends React.Component {
    state = {
        msgs: [],
        msg: "",
        user: this.props.user,
        conversationID: ""
    }
    componentDidMount() {

    }
    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <View style={{marginTop: '10%'}}>
                    <Icon
                        raised
                        name='keyboard-backspace'
                        color='blue'
                        containerStyle={styles.icon}
                        onPress={() => RootNavigation.navigate('Goals')} />
                        </View>
                <View style={styles.container}>

                    <GiftedChat
                        messages={this.state.msgs}
                        onSend={msgs => this.onSend(msgs)}
                        user={{ _id: 1
                            // this.state.user._id 
                        }}
                    />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = state => ({user: state.auth.user});

export default connect(mapStateToProps)(ChatPage);