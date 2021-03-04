import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as RootNavigation from '../routes/routes';
import { io } from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';
import dayjs from "dayjs";
import * as ImagePicker from "expo-image-picker";

import { View, Text, ImageBackground, TouchableOpacity, Dimensions, KeyboardAvoidingView } from 'react-native';
import { styles } from '../constants/styles';
import { Icon } from 'react-native-elements';

class ChatPage extends React.Component {
    state = {
        msgs: [],
        msg: "",
        user: this.props.user,
        conversation: this.props.route.params.conversation,
        goal: this.props.route.params.goal,
        receiveMsg: (receivedMsgs = []) => {
            this.setState({ conversation: { ...this.state.conversation, messages: receivedMsgs } });
        }
    }
    componentDidMount() {
        const socket = io("https://arcane-shore-64990.herokuapp.com");
        socket.on("connect", () => {
            console.log("connected");
            this.setState({ socket }, () => {
                this.state.socket.on("from server", (msg => {
                    console.log("hello")
                    this.state.receiveMsg(msg);
                    console.log(msg);
                }))
            })
        })
    }
    onSend = ((newMsgs = []) => {

        //this.state.msgs = old messages 
        //newMsgs = new message 
        //combine them and then sort them by time 
        const msgs = this.state.conversation.messages.concat(newMsgs).sort((a, b) => {
            const msgA = dayjs(a.createdAt);
            return msgA.isBefore(dayjs(b.createdAt)) ? 1 : -1;
        });

        //update the state with the new messages so they can see the new message in real time
        this.setState({ conversation: { ...this.state.conversation, messages: msgs } }, () => {

            //send messages to server with the conversation ID 
            //the server will update the conversation in the DB so when the user logs back in
            //the messages are still there
            this.state.socket.emit("send message", { msgs, conversationID: this.state.conversation._id });
        })
    })

    pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0,
        });
    
        //console.log(result);
    
        if (!result.cancelled) {
            this.setState({image: result.uri});
        }
    };
    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View>
                    <ImageBackground  style={{ height: Dimensions.get('window').height * 0.12, width: Dimensions.get('window').width }} source={require('../assets/chatheader.png')}>
                        <Icon raised name='keyboard-backspace' iconStyle={{ color: 'black' }} containerStyle={{position: 'relative', marginTop: '10%'}} onPress={() => RootNavigation.navigate('Home')} />
                        <Text style={styles.headerText}> {this.state.user.username}</Text>
                    </ImageBackground>
                    <View style={{ position: 'relative', alignSelf: 'flex-end', }}>
                    <Icon size={30} reverse name='ios-image-outline' type='ionicon' color='#ff5454' onPress={() => { 
                        this.pickImage();
                    }} />
                    <View style={styles.centered}>
                    <Text style={styles.smallText}>POST</Text>
                    <Text style={styles.smallText}>PROGRESS</Text>
                    </View>
                </View>
                </View>
                <View style={styles.container}>
                    <GiftedChat
                        messages={this.state.conversation.messages}
                        onSend={msgs => this.onSend(msgs)}
                        user={{
                            _id: this.props.user._id

                        }}
                    />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = state => ({ user: state.auth.user });

export default connect(mapStateToProps)(ChatPage);