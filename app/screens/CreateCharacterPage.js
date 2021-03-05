import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { register } from '../actions/register-action';
import * as RootNavigation from '../routes/routes';

//view stuff
import { View, Text, ImageBackground,TouchableOpacity, Image } from 'react-native';
import { TextInput,  } from 'react-native-gesture-handler';
import { styles } from '../constants/styles';

//import characters
import spriteM1 from '../assets/sprite-m1.gif';
import spriteM2 from '../assets/sprite-m2.gif';
import spriteF1 from '../assets/sprite-f1.gif';
import spriteF2 from '../assets/sprite-f2.gif';


const CreateCharacterPage = (props) => {
    let [gender, setGender] = useState('female');
    let [hair, setHair] = useState('2');
    let [imgsrc, setImgSrc] = useState("");
    let [imgStr, setImgStr] = useState("");

    console.log('hi');

    let user = props.route.params;

    let renderImage = () => {
        let imgsrc = '';
        if (gender === 'female' && hair === '1') {
            imgsrc = spriteF1;
            setImgStr('../assets/sprite-f1.gif')
        } else if (gender === 'female' && hair === '2') {
            imgsrc = spriteF2;
            setImgStr('../assets/sprite-f1.gif')
        } else if (gender === 'male' && hair === '1') {
            imgsrc = spriteM1;
            setImgStr('../assets/sprite-m1.gif')
        } else if (gender === 'male' && hair === '2') {
            imgsrc = spriteM2;
            setImgStr('../assets/sprite-m2.gif')
        }
        setImgSrc(imgsrc);
    }

    useEffect(() => {
        renderImage();
     }, [hair, gender]);

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.container}
                source={require('../assets/characterpage.png')}>
                <View style={{ marginBottom: '65%' }} />
                <Image style={{alignSelf: 'center'}} source={imgsrc} />
                <View style={{ marginBottom: '30%' }} />
                <View style={styles.rowView}>
                    <TouchableOpacity
                        style={styles.maleButton}
                        onPress={() => {
                            setGender('male');
                        }} >
                        <Text style={styles.buttonText}>MALE</Text>
                    </TouchableOpacity>
                    <Text>&nbsp;&nbsp;&nbsp;</Text>
                    <TouchableOpacity
                        style={styles.femaleButton}
                        onPress={() => {
                            setGender('female');
                        }} >
                        <Text style={styles.buttonText}>FEMALE</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowView}>
                    <TouchableOpacity
                        style={styles.hairButton}
                        onPress={() => {
                            setHair('1');
                        }} >
                        <Text style={styles.buttonText}>HAIRSTYLE 1</Text>
                    </TouchableOpacity>
                    <Text>&nbsp;&nbsp;&nbsp;</Text>
                    <TouchableOpacity
                        style={styles.hairButton}
                        onPress={() => {
                            setHair('2');
                        }} >
                        <Text style={styles.buttonText}>HAIRSTYLE 2</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: '10%' }} />
                <TouchableOpacity
                    style={styles.charButton}
                    onPress={() => {
                        user.avatar = imgStr;
                        props.register(user);
                    }} >
                    <Text style={styles.buttonText}>COMPLETE REGISTRATION</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
    
}


const mapDispatchToProps = dispatch => ({register: (user) => dispatch(register(user))});

export default connect(undefined, mapDispatchToProps)(CreateCharacterPage);