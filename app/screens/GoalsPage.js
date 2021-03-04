import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as RootNavigation from '../routes/routes';

import { View, Text, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { styles } from '../constants/styles';
import axios from 'axios';

const GoalsPage = (props) => {
    const user = props.auth.user;
    let goalBlocks = [];
    console.log(user);

    if (user.goals.length > 0) {
        for (let i = 0; i < user.goals.length; i++) {
            const goalBlock = (
                <View key={i}>
                    <TouchableOpacity onPress={() => {
                        if (user.goals[i].conversation) {
                            axios.get(`https://arcane-shore-64990.herokuapp.com/get-convo/${user.goals[i].conversation}`)
                                .then( conversation => RootNavigation.navigate("Chat", {goal: user.goals[i], conversation: conversation.data}))
                                .catch( err => console.log(err));
                        }
                        
                    }}>
                        <Text>{user.goals[i].goalType.name}</Text>
                        <Text>{user.goals[i].buddy ? user.goals[i].buddy.username : "Not matched"}</Text>
                    </TouchableOpacity>
                </View>
            )
            goalBlocks.push(goalBlock);
        }
    }
    return (
        <View styles={styles.container}> 
            <Text>Goals</Text>
            <View styles={styles.rowView}>
                {goalBlocks}
            </View>
            
        </View>
    )
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(GoalsPage);