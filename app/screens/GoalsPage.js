import React from 'react';
import { connect } from 'react-redux';
import * as RootNavigation from '../routes/routes';
import dayjs from 'dayjs';
import axios from "axios";

import { View, Text, ImageBackground, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { styles } from '../constants/styles';
import ProgressBar from 'react-native-progress/Bar';
import { Icon } from 'react-native-elements';

const GoalsPage = (props) => {
    //bolded text
    const B = (props) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>
    const user = props.auth.user;

    //render flatlist for goals
    const renderItem = ({ item }) => {
        //get percentage of goal progress for progress bar
        let prog = item.currentProgress / item.targetGoal;
        //get # of days left until goal complete
        const dDay = dayjs(item.deadline);
        let daysLeft = dDay.diff(dayjs(), 'day');
        //get icon for activity
        let iconname = '';
        if (item.goalType.name === 'Running') {
            iconname = 'running';
        } else if (item.goalType.name === 'Weightligting') {
            iconname = 'dumbbell';
        } else if (item.goalType.name === 'Swimming') {
            iconname = 'swimmer';
        } else if (item.goalType.name === 'Hiking') {
            iconname = 'hiking';
        } else if (item.goalType.name === 'Cycling') {
            iconname = 'bicycle';
        } else if (item.goalType.name === 'Sports') {
            iconname = 'basketball-ball';
        }

        return (
            <View style={styles.listView}>
                <TouchableOpacity onPress={() => {
                    if (item.conversation) {
                        axios.get(`https://arcane-shore-64990.herokuapp.com/get-convo/${item.conversation._id}`)
                            .then( conversation => RootNavigation.navigate("Chat", {goal: item, conversation: conversation.data}))
                            .catch( err => console.log(err));
                    }
                    // RootNavigation.navigate('Chat', { goal: item }) 
                }}>
                    <View style={{ position: 'relative', alignSelf: 'flex-end', }} >
                        <Icon reverse size={15} name={iconname} type='font-awesome-5' reverseColor='#4d70ff' />
                    </View>
                    <View style={{ backgroundColor: 'darkgrey', width: '97%', alignSelf: 'flex-end', margin: 5, padding: 5 }}>
                        <Text style={{ fontSize: 15 }}>{(item.buddy && Object.keys(item.buddy).length > 0) ? 'Matched with: ' + item.buddy.username + ' (click to chat!)' : "Match Pending..."}</Text>
                    </View>


                    <View style={styles.rowView}>
                        <View style={{ backgroundColor: 'lightblue', width: '50%', borderRadius: 25, alignSelf: 'flex-end', margin: 5 }}>
                            <Text style={{ padding: 5, fontSize: 12, alignSelf: 'center' }}>Goal Category: <B>{item.goalType.category}</B></Text>
                        </View>
                        <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                        <View style={{ borderRadius: 33, backgroundColor: 'lightpink', margin: 5, padding: 5 }}>
                            <Text style={{ fontSize: 10 }}>{daysLeft} days left</Text>
                        </View>
                    </View>
                    <ProgressBar progress={prog} unfilledColor='lightgrey' width={350} color={'#59de78'} borderColor={'black'} />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.container}
                source={require('../assets/currentgoalspage.png')}>
                <View style={{ justifyContent: 'flex-start', marginTop: '65%' }}>
                    <Icon reverse name='ios-add-outline' type='ionicon' color='#ff5454' onPress={() => { RootNavigation.navigate('CreateGoal') }} />
                </View>
                <SafeAreaView style={styles.scrollView}>
                    {(user.goals.length > 0) ? 
                    <FlatList
                        data={user.goals}
                        renderItem={renderItem}
                        keyExtractor={item => item._id}
                    />
                    : <View /> }
                </SafeAreaView>
            </ImageBackground>
        </View>
    )
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(GoalsPage);