import React, { useState } from 'react';
import { connect } from 'react-redux';
import { register } from '../actions/register-action';
import * as RootNavigation from '../routes/routes';

//view stuff
import { View, Text, ImageBackground,TouchableOpacity, Alert } from 'react-native';
import { TextInput,  } from 'react-native-gesture-handler';
import { styles } from '../constants/styles';
import DropDownPicker from 'react-native-dropdown-picker';

const RegisterPage = (props) => {
    //user properties
    const [username, setUsername] = useState(' ');
    const [password, setPassword] = useState(' ');
    const [password2, setPassword2] = useState(' ');
    const [email, setEmail] = useState(' ');
    const [dobYear, setDobYear] = useState(' ');
    const [dobMonth, setDobMonth] = useState(' ');
    const [dobDay, setDobDay] = useState(' ');
    const [dobString, setDobString] = useState(' ');
    const [gender, setGender] = useState(' ');

    //alert
    const createAlert = (title, message) => {
        return Alert.alert(
            title,
            message,
            [{ text: "Ok", onPress: () => console.log("ok press"), style: 'cancel' }]
        )
    }

    //generate years
    let yearArr = [];
    for (let i = 2021; i >= 1900; --i) {
        yearArr.push({label: i.toString(), value: i.toString()});
    }
    //months
    let monthArr= [];
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    for (let i = 0; i < month.length; ++i) {
        monthArr.push({label: month[i], value: (i+1).toString()});
    }
    //generate days
    let dayArr = [];
    for (let i = 1; i <= 31; ++i) {
        dayArr.push({label: i.toString(), value: i.toString()});
    }
    //generate genders
    let genderArr = [];
    const genders = ['Male', 'Female', 'Prefer not to say'];
    for (let i = 0; i < genders.length; ++i) {
        genderArr.push({label: genders[i], value: genders[i]});
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.container}
                source={require('../assets/registerpage.png')}>
                <View style={styles.centered}>
                    <View style={styles.regInput}>
                        <TextInput
                            style={styles.inputText}
                            placeholder='Username'
                            placeholderTextColor='white'
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={text => setUsername({ text: text.trim() })} />
                    </View>
                    <View style={styles.regInput}>
                        <TextInput
                            style={styles.inputText}
                            secureTextEntry
                            blurOnSubmit={false}
                            onSubmitEditing={() => Keyboard.dismiss()}
                            placeholder="Password"
                            placeholderTextColor='white'
                            onChangeText={text => setPassword({ text: text.trim() })} />
                    </View>
                    <View style={styles.regInput}>
                        <TextInput
                            secureTextEntry
                            style={styles.inputText}
                            placeholder="Re-Enter Password"
                            placeholderTextColor='white'
                            onChangeText={text => setPassword2({ text: text.trim() })} />
                    </View>
                    <View style={styles.regInput}>
                        <TextInput
                            style={styles.inputText}
                            placeholder='Email'
                            placeholderTextColor='white'
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={text => setEmail({ text: text.trim() })} />
                    </View>
                    <View style={styles.genderView}>
                        <DropDownPicker
                            items={genderArr}
                            placeholder='Gender'
                            containerStyle={{ height: 40, minWidth: 300 }}
                            style={{ backgroundColor: '#4d70ff' }}
                            itemStyle={{ justifyContent: 'flex-start' }}
                            dropDownStyle={{ backgroundColor: '#4d70ff' }}
                            labelStyle={{ color: 'white' }}
                            onChangeItem={text => setGender( text.value )}
                        />
                    </View>
                    <View style={styles.rowView}>
                        <View style={styles.dobView}>
                            <DropDownPicker
                                items={yearArr}
                                placeholder='YYYY'
                                containerStyle={{ height: 40 }}
                                style={{ backgroundColor: '#4d70ff' }}
                                itemStyle={{ justifyContent: 'flex-start' }}
                                dropDownStyle={{ backgroundColor: '#4d70ff' }}
                                labelStyle={{color: 'white'}}
                                onChangeItem={text => setDobYear( text.value )}
                            />
                        </View>
                        <View style={styles.dobView}>
                            <DropDownPicker
                                items={monthArr}
                                placeholder='MM'
                                containerStyle={{ height: 40 }}
                                style={{ backgroundColor: '#4d70ff' }}
                                itemStyle={{ justifyContent: 'flex-start' }}
                                dropDownStyle={{ backgroundColor: '#4d70ff' }}
                                labelStyle={{color: 'white'}}
                                onChangeItem={text => setDobMonth( text.value )}
                            />
                        </View>
                        <View style={styles.dobView}>
                            <DropDownPicker
                                items={dayArr}
                                placeholder='DD'
                                containerStyle={{ height: 40 }}
                                style={{ backgroundColor: '#4d70ff' }}
                                itemStyle={{ justifyContent: 'flex-start' }}
                                dropDownStyle={{ backgroundColor: '#4d70ff' }}
                                labelStyle={{color: 'white'}}
                                onChangeItem={text => setDobDay( text.value )}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.regButton}
                        onPress={() => {
                            //only demoable alert
                            //create alert if user is under 18
                            let failCheck = false;
                            //right now only checking year for age
                            //later can check whole dob 
                            if (parseInt(dobYear.text) > 2003) {
                                createAlert('Error', 'Must be 18 or older');
                                failCheck = true;
                            }

                            //if pass credentials, create user
                            if (!failCheck) {
                                const user = {
                                    username: username.text,
                                    password: password.text,
                                    email: email.text,
                                    dateOfBirth: dobYear + '/' + dobMonth + '/' + dobDay,
                                    gender: gender
                                };
                                RootNavigation.navigate('CreateCharacter', user);
                            }

                        }} >
                        <Text style={styles.buttonText}>CREATE CHARACTER</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )

}


const mapDispatchToProps = dispatch => ({
    register: (user) => dispatch(register(user))
});
const mapStateToProps = state => ({reg: state.reg});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);