import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as RootNavigation from '../routes/routes';
import dayjs from 'dayjs';
import axios from "axios";

import { View, Text, ImageBackground, TouchableOpacity, FlatList, SafeAreaView, ScrollView, Image, Modal } from 'react-native';
import { styles } from '../constants/styles';
import ProgressBar from 'react-native-progress/Bar';
import { Icon } from 'react-native-elements';

class JourneyPage extends React.Component {
    state = {
        user: this.props.auth.user,
        imgArr: [],
        show: false,
        curImg: '',
        currDay: '',
        currProg: '',
        pgoal: '',
    }
    //bolded text
    //  const B = (props) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>

    componentDidMount() {
        //hehe
        
        //console.log(this.state.imgArr)
    }
    //render flatlist for goals
    renderItem = ({ item }) => {
        //get percentage of goal progress for progress bar
        let prog = item.currentProgress / item.targetGoal;
        let nodProg = Math.trunc(prog * 100);
        //get # of days left until goal complete
        const dDay = dayjs(item.deadline);
        let daysLeft = dDay.diff(dayjs(), 'day');
        //get formatted deadline date
        let dDayFormatted = dayjs(item.deadline).format('dddd, MMMM d');
        //get icon for activity
        let iconname = '';
        let goalname = '';
        let pgoal = '';
        if (item.goalType.name === 'Running') {
            iconname = 'running';
            goalname = 'run';
            pgoal = 'ran';
        } else if (item.goalType.name === 'Weightligting') {
            iconname = 'dumbbell';
            goalname = 'lift weights';
            pgoal = 'lifted';
        } else if (item.goalType.name === 'Swimming') {
            iconname = 'swimmer';
            goalname = 'swim';
            pgoal = 'swam';
        } else if (item.goalType.name === 'Hiking') {
            iconname = 'hiking';
            goalname = 'hike';
            pgoal = 'hiked';
        } else if (item.goalType.name === 'Cycling') {
            iconname = 'bicycle';
            goalname = 'bike';
            pgoal = 'biked';
        } else if (item.goalType.name === 'Sports') {
            iconname = 'basketball-ball';
            goalname = 'play sports';
            pgoal = 'played';
        }
        //to get img
        if (item.conversation) {
            for (let j = 0; j < item.conversation.messages.length; ++j) {
                if (item.conversation.messages[j].confirmed && item.conversation.messages[j].didSet) {
                    this.state.imgArr.push({img: item.conversation.messages[j].image, day: item.conversation.messages[j].createdAt, prog: item.conversation.messages[j].progressToGoal, goalid: item.conversation.messages[j].goal});
                }
            }
        }
        let img = [];
        for (let i = 0; i < this.state.imgArr.length; ++i) {
            if (item.conversation && this.state.imgArr[i].img.length > 0 && item._id === this.state.imgArr[i].goalid) {
                 img.push({img: this.state.imgArr[i].img, day: this.state.imgArr[i].day, prog: this.state.imgArr[i].prog, goal: pgoal});
            }
        }
        console.log(this.state.imgArr)
        return (
            <View style={styles.journeyFeed}>

                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.show}
                    onRequestClose={() => { this.setState({ show: false }); }}
                >
                    <View style={styles.centered, { marginTop: '50%' }}>
                        <View style={styles.modalView}>
                            <View style={{ position: 'relative', alignSelf: 'flex-end' }}>
                                <Icon reverse size={15} name='times' type='font-awesome-5' reverseColor='#ff5454' onPress={() => { this.setState({ show: false }); }} />
                            </View>
                            <Text style={{ fontSize: 15, color: 'grey', marginBottom: '1%' }}>Posted on: {dayjs(this.state.currDay).format('DD/MM/YYYY')} at {dayjs(this.state.currDay).format('h:mm A')}</Text>
                            <Image source={{ uri: this.state.curImg }} style={{ height: 300, width: 300 }} />
                            <Text style={{ fontSize: 15, color: 'grey', marginTop: '1%' }}>{this.state.pgoal} for {this.state.currProg}km this day</Text>
                        </View>
                    </View>
                </Modal>

                <View style={{ position: 'absolute', alignSelf: 'flex-start', marginTop: '2%' }} >
                    <View style={{ borderRadius: 33, backgroundColor: 'lightpink', padding: 5, position: 'relative', alignSelf: 'flex-end' }}>
                        <Text style={{ fontSize: 10 }}>{daysLeft} days left</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon reverse size={25} name={iconname} type='font-awesome-5' reverseColor='#4d70ff' />
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={{ fontSize: 15, color: 'grey' }}>goal: {goalname} for {item.targetGoal}km by {dDayFormatted}</Text>
                            <ProgressBar progress={prog} unfilledColor='lightgrey' width={270} color={'#59de78'} borderColor={'black'} />
                            <Text style={{ fontSize: 15, color: 'grey' }}>{nodProg}% complete</Text>
                        </View>
                        
                    </View>
                    <ScrollView horizontal={true} style={styles.horizontalScroll}>
                        {
                            (item.conversation && img.length > 0) ?
                                img.map(pic => {
                                    return (
                                        <View>
                                            <Text>&nbsp;</Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                                <TouchableOpacity onPress={() => this.setState({ show: true, curImg: pic.img, currDay: pic.day, currProg: pic.prog, pgoal: pic.goal })}>
                                                    <Image source={{ uri: pic.img }} style={{ height: 180, width: 180 }} />
                                                </TouchableOpacity>
                                                <Text>&nbsp;&nbsp;&nbsp;</Text>
                                            </View>
                                        </View>
                                    )
                                })
                                : <View />
                        }
                        
                    </ScrollView>
                </View>
            </View>
        )
    }
    render() {

        return (
            <View style={styles.container}>
                <ImageBackground
                    style={styles.container}
                    source={require('../assets/journeypage.png')}>

                    <SafeAreaView style={styles.journeyScroll}>
                        <FlatList
                            data={this.state.user.goals}
                            renderItem={this.renderItem}
                            keyExtractor={item => item._id}
                        />
                    </SafeAreaView>
                </ImageBackground>
            </View>
        )
    }

}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(JourneyPage);