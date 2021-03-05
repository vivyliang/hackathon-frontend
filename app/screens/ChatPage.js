import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as RootNavigation from '../routes/routes';
import { io } from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';
import dayjs from "dayjs";
import * as ImagePicker from "expo-image-picker";

import { 
    View, 
    Text, 
    ImageBackground, 
    TouchableOpacity, 
    Dimensions, 
    KeyboardAvoidingView, 
    Modal, 
    LogBox, 
    Image } from 'react-native';
import { TextInput,  } from 'react-native-gesture-handler';
import { styles } from '../constants/styles';
import { Icon } from 'react-native-elements';

//import characters
import spriteM1 from '../assets/sprite-m1.gif';
import spriteM2 from '../assets/sprite-m2.gif';
import spriteF1 from '../assets/sprite-f1.gif';
import spriteF2 from '../assets/sprite-f2.gif';

LogBox.ignoreAllLogs();

class ChatPage extends React.Component {
    state = {
        msgs: [],
        msg: "",
        user: this.props.user,
        conversation: this.props.route.params.conversation,
        goal: this.props.route.params.goal,
        needConfirmation: false,
        confirmationModalVisible: false,
        receiveMsg: (receivedMsgs = []) => {
            this.setState({ 
                conversation: { ...this.state.conversation, messages: receivedMsgs } 
            }, () => {

                if (
                    this.state.conversation.messages[0].user._id !==  this.state.user._id 
                    && this.state.conversation.messages[0].image 
                    && !this.state.conversation.messages[0].confirmed
                    && !this.state.conversation.messages[0].didSet
                    ) { 
                        this.setState({confirmationModalVisible: true, needConfirmation: true });
                }
                     
            });
        },
        avatar: '',
        modalVisible: false
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

        if (this.state.user.avatar) {
            if (this.state.user.avatar.indexOf("m1") > -1) {
                this.state.avatar = spriteM1;
            } else if (this.state.user.avatar.indexOf("m2") > -1) {
                this.state.avatar = spriteM2;
            } else if (this.state.user.avatar.indexOf("f1") > -1) {
                this.state.avatar = spriteF1;
            } else {
                this.state.avatar = spriteF2;
            }
        }

    }
    onSend = ((newMsgs = []) => {

        //newMsgs = new message 
        //combine them and then sort them by time 
        const msgs = newMsgs.length < this.state.conversation.messages.length ? this.state.conversation.messages.concat(newMsgs).sort((a, b) => {
            const msgA = dayjs(a.createdAt);
            return msgA.isBefore(dayjs(b.createdAt)) ? 1 : -1;
        }) : this.state.conversation.messages;

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

            const imageMsg = {
                _id: this.state.conversation.messages.length+1,
                user: {
                    _id: this.state.user._id,
                    avatar: this.state.avatar
                },
                image: "https://i.imgur.com/6rkXRBN.jpg",
                createdAt: dayjs(),
                goal: this.state.goal._id,
                confirmed: false,
                didSet: false
            }
            
            this.setState({modalVisible: true, imageMsg}, () => {

            })
            
            //this.onSend([imageMsg]);

            //this.setState({image: result.uri});
        }
    };
    sendImage = () => {
        this.onSend([this.state.imageMsg]);
    }
    confirmProgress = () => {

    }
    render() {
        console.log(this.state.avatar)
        return (
            <View
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View>
                    <Modal 
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.setState({modalVisible: false})
                        }}>
                        <View style={styles.centered}>
                            <Text>How much progress did you make today?</Text>
                            <TextInput 
                                style={styles.inputText}
                                placeholder='progress'
                                autoCapitalize='none'
                                autoCorrect={false}
                                onChangeText={text => this.setState({imageMsg: {...this.state.imageMsg, progressToGoal: text}})}
                            />
                            <TouchableOpacity
                                style={styles.loginButton}
                                onPress={() => {
                                    this.sendImage();
                                    this.setState({modalVisible: false})
                                }} >
                                    <Text style={styles.buttonText}>LOGIN</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                    <Modal 
                        animationType="slide"
                        transparent={false}
                        visible={this.state.confirmationModalVisible}
                        onRequestClose={() => {
                            this.setState({confirmationModalVisible: false})
                        }}>
                        <View style={{paddingTop: "25%"}}>
                            <Image source={this.state.needConfirmation ? this.state.conversation.messages[0].image : ""}/>
                            <TouchableOpacity
                                style={styles.loginButton}
                                onPress={() => {

                                    let messages = this.state.conversation.messages;
                                    messages[0].confirmed = true;
                                    messages[0].didSet = true;
                                    this.onSend(messages);

                                    

                                    this.setState({confirmationModalVisible: false})
                                }} >
                                    <Text style={styles.buttonText}>YES</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.loginButton}
                                onPress={() => {
                                    let messages = this.state.conversation.messages;
                                    messages[0].didSet = true;

                                    this.onSend(messages);
                                    this.setState({confirmationModalVisible: false})
                                }} >
                                    <Text style={styles.buttonText}>NO</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                    <ImageBackground  style={{ height: Dimensions.get('window').height * 0.12, width: Dimensions.get('window').width }} source={require('../assets/chatheader.png')}>
                        <Icon raised name='keyboard-backspace' iconStyle={{ color: 'black' }} containerStyle={{position: 'relative', marginTop: '10%'}} onPress={() => RootNavigation.navigate('Home')} />
                        <Text style={styles.headerText}> {this.state.goal.buddy.username}</Text>
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
                            _id: this.props.user._id,
                            avatar: this.state.avatar
                        }}
                        showUserAvatar={true}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({ user: state.auth.user });

export default connect(mapStateToProps)(ChatPage);