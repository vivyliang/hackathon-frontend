import { StyleSheet, Dimensions } from 'react-native';

//global screen width and height
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'center',
    }, 
    usernameView: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 3,
        height: "6%",
        justifyContent: "center",
        padding: 20,
        marginTop: Math.round(height) * 0.35,
        marginLeft: "10%"
    },
    passwordView: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 3,
        height: "6%",
        justifyContent: "center",
        padding: 20,
        marginTop: "3%",
        marginLeft: "10%"
    },
    inputText: {
        height: 50,
        color: "black"
    },
    smallText: {
        fontSize: 10,
        color: "black"
    },
    medText: {
        fontSize: 15,
        color: "black",
        alignSelf: 'flex-end',
        fontWeight: 'bold'
    },
    forgotPassword: {
        color: "black",
        fontSize: 12,
        alignSelf: "center",
        marginTop: "3%"
    },
    signUpButton: {
        color: "white",
        fontSize: 12,
        alignSelf: "center",
        marginTop: "3%"
    },
    loginButton: {
        width: "25%",
        backgroundColor: "#000",
        borderRadius: 3,
        height: 10,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        marginTop: "2%",
        alignSelf: "center",
    },
    regButton: {
        width: Math.round(width) * 0.45,
        backgroundColor: "#000",
        borderRadius: 3,
        height: 10,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        marginTop: "2%",
        alignSelf: "center",
        zIndex: -1
    },
    maleButton: {
        width: "25%",
        backgroundColor: "#2225f0",
        borderRadius: 3,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        marginTop: "2%",
        alignSelf: "center",
    },
    femaleButton: {
        width: "25%",
        backgroundColor: "#eb81dd",
        borderRadius: 3,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        marginTop: "2%",
        alignSelf: "center",
    },
    hairButton: {
        width: "35%",
        backgroundColor: "#000",
        borderRadius: 3,
        height: 10,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        marginTop: "2%",
        alignSelf: "center",
    },
    buttonText: {
        height: 15,
        color: "white"
    },
    regInput: {
        width: Math.round(width) * 0.8,
        backgroundColor: "#4d70ff",
        borderRadius: 3,
        height: "5%",
        padding: 20,
        marginTop: '2.5%',
        justifyContent: 'center',
    },
    smallInput: {
        width: Math.round(width) * 0.1,
        backgroundColor: "#4d70ff",
        borderRadius: 3,
        height: 20,
        padding: 5,
        marginTop: '2.5%',
        justifyContent: 'center',
        alignSelf: 'flex-end'
    },
    roundInput: {
        width: Math.round(width) * 0.6,
        backgroundColor: "#4d70ff",
        color: 'white',
        padding: 10,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    dobView: {
        width: Math.round(width) * 0.2,
        justifyContent: "center",
        alignSelf: 'center',
        marginTop: '2%',
        zIndex: 2,
    },
    genderView: {
        width: Math.round(width) * 0.8,
        justifyContent: "center",
        alignSelf: 'center',
        marginTop: '2%',
        zIndex: 1,
    },
    goalView: {
        width: Math.round(width) * 0.8,
        alignSelf: 'center',
        zIndex: 1,
        marginTop: '25%'
    },
    tabView: {
        flex: 1,
        backgroundColor: '#1335bf',
        height: Math.round(height) * 0.1,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    singleTab: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5%',
    },
    listView: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderTopColor: 'transparent',
        width: Math.round(width) * 0.9,
        alignSelf: 'center',
        justifyContent: 'flex-end',
        height: height * 0.15,
    },
    scrollView: {
        height: height * 0.8,
        //marginTop: height * 0.25,
    },
    scrollView2: {
        height: height * 0.7,
        marginTop: height * 0.1,
    }
})