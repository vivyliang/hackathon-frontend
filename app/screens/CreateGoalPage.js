import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as RootNavigation from '../routes/routes';
import axios from "axios";
import DateTimePicker from '@react-native-community/datetimepicker';
import qs from "qs";

//view stuff
import { View, Text, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { TextInput, } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from '../constants/styles';

const CreateGoalPage = (props) => {
    const user = props.auth.user;
    const [goalLabels, setGoalLabels] = useState([]);
    const [selectedGoal, setSelectedGoal] = useState({});
    const [formDisplay, setFormDisplay] = useState("none");
    const [target, setTarget] = useState('');
    const [deadline, setDeadline] = useState(new Date());

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDeadline(currentDate)
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.container}
                source={require('../assets/creategoalpage.png')}>
                <View style={styles.rowView}>
                    <View style={styles.goalView}>
                        <DropDownPicker
                            items={[
                                { label: "Exercise", value: "Exercise" },
                                { label: "Mindfulness", value: "Mindfulness" },
                                { label: "Lifestyle", value: "Lifestyle" }
                            ]}
                            placeholder='Select a type of goal'
                            containerStyle={{ height: 40 }}
                            style={{ backgroundColor: '#4d70ff' }}
                            itemStyle={{ justifyContent: 'flex-start' }}
                            dropDownStyle={{ backgroundColor: '#4d70ff' }}
                            labelStyle={{ color: 'white' }}
                            onChangeItem={text => {
                                axios.get(`http://localhost:8080/goals-from-type/${text.value}`)
                                    .then((response) => {

                                        let goalLabels = [];
                                        for (let i = 0; i < response.data.length; i++) {
                                            goalLabels.push({
                                                label: response.data[i].name,
                                                value: response.data[i]._id
                                            })
                                        }
                                        setGoalLabels(goalLabels);

                                    }).catch((err) => console.log(err));
                            }}
                        />
                    </View>
                    <View style={styles.goalView}>
                        <DropDownPicker
                            items={goalLabels}
                            placeholder='Select goal'
                            containerStyle={{ height: 40 }}
                            style={{ backgroundColor: '#4d70ff' }}
                            itemStyle={{ justifyContent: 'flex-start' }}
                            dropDownStyle={{ backgroundColor: '#4d70ff' }}
                            labelStyle={{ color: 'white' }}
                            onChangeItem={text => {
                                setSelectedGoal(text);
                                setFormDisplay("blocl")
                            }}
                        />
                    </View>

                </View>
                <View style={{ display: formDisplay }}>
                    <View style={styles.regInput}>
                        <TextInput
                            style={styles.inputText}
                            placeholder='Target KMs Run'
                            placeholderTextColor='white'
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={text => setTarget(text.trim())} />
                    </View>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={deadline}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={onDateChange}
                    />
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => {
                            const data = {
                                goal: selectedGoal.value,
                                user: props.auth.user._id,
                                targetGoal: target,
                                deadline
                            };
                            console.log(data);
                            axios.post("https://arcane-shore-64990.herokuapp.com/add-user-to-goal", qs.stringify(data), { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
                                .then((response) => {
                                    if (response.data.length) {
                                        //no match
                                    } else {
                                        console.log(response.data)
                                    }
                                })
                                .catch(err => console.log(err));

                        }} >
                        <Text style={styles.buttonText}>Set Goal</Text>
                    </TouchableOpacity>
                </View>


            </ImageBackground>
        </View>
    )
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(CreateGoalPage);