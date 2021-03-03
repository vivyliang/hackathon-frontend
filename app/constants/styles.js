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
    dobView: {
        width: Math.round(width) * 0.2,
        justifyContent: "center",
        alignSelf: 'center',
        marginTop: '2%',
        zIndex: 2,
    },
    goalView: {
        width: Math.round(width) * 0.4,
        justifyContent: "center",
        alignSelf: 'center',
        marginTop: '2%',
    },
    genderView: {
        width: Math.round(width) * 0.8,
        justifyContent: "center",
        alignSelf: 'center',
        marginTop: '2%',
        zIndex: 1,
    },
})