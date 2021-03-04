import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as RootNavigation from '../routes/routes';
import axios from "axios";
import DateTimePicker from '@react-native-community/datetimepicker';
import qs from "qs";
import { addGoal } from '../actions/auth-action';

//view stuff
import { View, Text, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput, } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from '../constants/styles';
import { Icon } from 'react-native-elements';

const CreateGoalPage = (props) => {
    let user = props.auth.user;

    const [goalLabels, setGoalLabels] = useState([]);
    const [selectedGoal, setSelectedGoal] = useState({});
    const [formDisplay, setFormDisplay] = useState("none");
    const [target, setTarget] = useState('');
    const [deadline, setDeadline] = useState(new Date());
    let [showIcons, setShowIcons] = useState(false);
    let [color, setColor] = useState(false);

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDeadline(currentDate)
    };

    let renderIcons = () => {
        //only renders for exercise atm
        return (
            <View style={styles.centered}>
                <View style={styles.rowView}>
                    <Icon reverse size={30} name='running' type='font-awesome-5' reverseColor={ color ? '#5ee67e' : '#4d70ff'} onPress={() => {console.log(goalLabels); setSelectedGoal(goalLabels.Running); setFormDisplay("block"); setColor(true)}} />
                    <Icon reverse size={30} name='dumbbell' type='font-awesome-5' reverseColor='#4d70ff' onPress={() => {setSelectedGoal(goalLabels.Weightlifting); setFormDisplay("block")}} />
                    <Icon reverse size={30} name='swimmer' type='font-awesome-5' reverseColor='#4d70ff' onPress={() => {setSelectedGoal(goalLabels.Swimming); setFormDisplay("block")}} />
                </View>
                <View style={styles.rowView}>
                    <Text style={styles.smallText}>RUNNING&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                    <Text style={styles.smallText}>WEIGHTLIFTING&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                    <Text style={styles.smallText}>SWIMMING</Text>
                </View>
                <View style={styles.rowView}>
                    <Icon reverse size={30} name='hiking' type='font-awesome-5' reverseColor='#4d70ff' onPress={() => {setSelectedGoal(goalLabels.Hiking); setFormDisplay("block")}} />
                    <Icon reverse size={30} name='bicycle' type='font-awesome-5' reverseColor='#4d70ff' onPress={() => {setSelectedGoal(goalLabels.Cycling); setFormDisplay("block")}} />
                    <Icon reverse size={30} name='basketball-ball' type='font-awesome-5' reverseColor='#4d70ff' onPress={() => {setSelectedGoal(goalLabels.Sports); setFormDisplay("block")}} />
                </View>
                <View style={styles.rowView}>
                    <Text style={styles.smallText}>HIKING&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                    <Text style={styles.smallText}>CYCLING&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                    <Text style={styles.smallText}>SPORTS</Text>
                </View>
            </View>
        )
    }

    useEffect(() => {

        if (Object.keys(goalLabels).length > 0) {
            setShowIcons(true);
        }
    }, [goalLabels])

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.container}
                source={require('../assets/creategoalpage.png')}>
                    <View style={{marginTop: '10%'}}>
                   <Icon raised name='keyboard-backspace' color='blue' containerStyle={styles.icon} onPress={() => RootNavigation.navigate('Home')} />
                   </View>
                    <ScrollView style={styles.scrollView2}>
                    <View style={styles.goalView}>
                        <DropDownPicker
                            items={[
                                { label: "Mindfullness", value: "Mindfullness" },
                                { label: "Productivity", value: "Productivity" },
                                { label: "Fitness", value: "Exercise" },
                                { label: "Finance", value: "Finance" },
                                { label: "Diet", value: "Diet" },
                                { label: "Writing", value: "Writing" },
                            ]}
                            placeholder='Select a type of goal'
                            containerStyle={{ height: 40 }}
                            style={{ backgroundColor: '#4d70ff' }}
                            itemStyle={{ justifyContent: 'flex-start' }}
                            dropDownStyle={{ backgroundColor: '#4d70ff' }}
                            labelStyle={{ color: 'white' }}
                            onChangeItem={text => {
                                axios.get(`https://arcane-shore-64990.herokuapp.com/goals-from-type/${text.value}`)
                                    .then((response) => {

                                        let goalObj = {};
                                        for (let i = 0; i < response.data.length; i++) {
                                            goalObj[response.data[i].name] = response.data[i]._id
                                        }
                                        setGoalLabels(goalObj);

                                    }).catch((err) => console.log(err));
                            }}
                        />

                    <View style={{marginBottom: '10%'}} />
                    {(showIcons) ? renderIcons() : <View />}
                </View>
                <View style={{marginBottom: '10%'}} />
                <View style={{ display: formDisplay }}>
                    <View style={styles.rowView}>
                        <Text style={styles.medText}>Target Distance:&nbsp;&nbsp;</Text>
                        <View style={styles.smallInput}>
                            <TextInput
                                style={styles.inputText}
                                placeholderTextColor='white'
                                placeholder='x'
                                autoCapitalize='none'
                                autoCorrect={false}
                                onChangeText={text => setTarget(text.trim())} />
                        </View>
                        <Text style={styles.medText}>&nbsp;km</Text>
                    </View>
                    <View style={{marginBottom: '5%'}} />
                    <View style={styles.rowView}>
                        <Text style={styles.medText}>Completion By:&nbsp;&nbsp;</Text>
                        <DateTimePicker
                            style={{alignSelf: 'center', width: 150}}
                            testID="dateTimePicker"
                            value={deadline}
                            mode={'date'}
                            is24Hour={true}
                            display="default"
                            onChange={onDateChange}
                        />
                   </View>
                    <View style={{marginBottom: '10%'}} />
                    <TouchableOpacity
                        style={styles.regButton}
                        onPress={() => {
                            const data = {
                                goal: selectedGoal,
                                user: props.auth.user._id,
                                targetGoal: target,
                                deadline
                            };

                            axios.post("https://arcane-shore-64990.herokuapp.com/add-user-to-goal", qs.stringify(data), { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
                                .then((response) => {

                                    axios.get(`https://arcane-shore-64990.herokuapp.com/get-user/${user._id}`)
                                        .then( response => props.addGoal(response.data))
                                        .catch( err => console.log(err))
       
                                })
                                .catch(err => console.log(err));

                        }} >
                        <Text style={styles.buttonText}>Get Matched!</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>

            </ImageBackground>
        </View>
    )
}

const mapStateToProps = state => ({ auth: state.auth });
const mapDispatchToProps = dispatch => ({addGoal: (user) => dispatch(addGoal(user))});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGoalPage);