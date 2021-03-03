import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth-action';
import * as RootNavigation from '../routes/routes';

//view stuff
import { View, Text, ImageBackground,TouchableOpacity, Dimensions } from 'react-native';
import { TextInput,  } from 'react-native-gesture-handler';
import { styles } from '../constants/styles';


const LoginPage = (props) => {
    //state properties to hold username/password from UI
    const [username, setUsername] = useState(' ');
    const [password, setPassword] = useState(' ');

    console.log(props);

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.container}
                source={require('../assets/loginpage.png')}>
                <View style={styles.usernameView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder='Username'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={text => setUsername({text})} />
                </View>
                <View style={styles.passwordView}>
                    <TextInput
                        style={styles.inputText}
                        secureTextEntry
                        placeholder='Password'
                        onChangeText={text => setPassword({text})} />
                </View>
                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => {
                        const user = {username: username.text, password: password.text};
                        console.log('loggin in');
                        props.login(user);
                    }} >
                        <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => {
                        RootNavigation.navigate('Register')
                    }} >
                        <View style={styles.rowView}>
                        <Text style={styles.forgotPassword}>Don't have an account? </Text>
                        <Text style={styles.signUpButton}>Sign up here</Text>
                        </View>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
    
}


const mapDispatchToProps = dispatch => ({login: (user) => dispatch(login(user))});
const mapStateToProps = state => ({auth: state.auth});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);