import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as RootNavigation from '../routes/routes';

import { View, Text, ImageBackground, TouchableOpacity, ScrollView, Image } from 'react-native';
import { styles } from '../constants/styles';

//import characters
import spriteM1 from '../assets/sprite-m1.gif';
import spriteM2 from '../assets/sprite-m2.gif';
import spriteF1 from '../assets/sprite-f1.gif';
import spriteF2 from '../assets/sprite-f2.gif';

const AvatarPage = (props) => {

    const renderAvatar = () => {
        let avatar = "";

        if (props.user.avatar) {
            if (props.user.avatar.indexOf("m1") > -1) {
                avatar = spriteM1;
            } else if (props.user.avatar.indexOf("m2") > -1) {
                avatar = spriteM2;
            } else if (props.user.avatar.indexOf("f1") > -1) {
                avatar = spriteF1;
            } else {
                avatar = spriteF2;
            }
        }

        return <Image style={styles.avatarimg} source={avatar} />
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.container}
                source={require('../assets/avatarroom.png')}>
                <View style={{ marginTop: '60%' }}>
                    {renderAvatar()}
                </View>
                <ScrollView horizontal={true} style={styles.itemScroll}>
                    <Image style={styles.items} source={require('../assets/pshoe.png')} />
                    <Image style={styles.items} source={require('../assets/hat.png')} />
                    <Image style={styles.items} source={require('../assets/rshoe.png')} />
                    <Image style={styles.items} source={require('../assets/book.png')} />
                    <Image style={styles.items} source={require('../assets/ball.png')} />
                </ScrollView>
            </ImageBackground>
        </View>
    )
}

const mapStateToProps = state => ({ user: state.auth.user });

export default connect(mapStateToProps)(AvatarPage);