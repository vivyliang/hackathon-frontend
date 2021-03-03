import { StyleSheet, Dimensions } from 'react-native';

//global screen width and height
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container: {
        flex:1,
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
    buttonText: {
        height: 15,
        color: "white"
    }
})