import React from "react";
import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView} from "react-native";
import Header from "../components/Header";
import { Keyboard } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";
import { useHeaderHeight } from '@react-navigation/elements'
import { useFocusEffect } from "@react-navigation/native";

function Onboarding({ navigation, setIsLoggedIn }) {
    const [firstName, onChangeFirstName] = React.useState('')
    const [lastName, onChangeLastName] = React.useState('')
    const [email, onChangeEmail] = React.useState('')
    const height = useHeaderHeight()
    const handleLogin = async () => {
        if (firstName != '' && email != '' && lastName != '' ) {
            try {
                await AsyncStorage.multiSet([['isLoggedIn', JSON.stringify(true)], ['firstName', JSON.stringify(firstName)], ['email', JSON.stringify(email)], ['lastName', JSON.stringify(lastName)]])
                console.log('Data successfully saved')
                setIsLoggedIn(true)
                navigation.navigate('Home')
            }
            catch (e) {
                console.log(e)
                Alert.alert(`An error occurred: ${e.message}`);
            }
        }
        else {
            return null;
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            onChangeFirstName('')
            onChangeLastName('')
            onChangeEmail('')
        }, [])
    );
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}  keyboardVerticalOffset={height}>
                    <Header />
                    <ScrollView keyboardDismissMode="on-drag" style={styles.innerContainer}>
                        <Text style={styles.text}>Let us get to know you</Text>
                        <Text style={styles.label}>First Name</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="First Name"
                            value={firstName}
                            onChangeText={onChangeFirstName}
                            returnKeyType="next"
                            onSubmitEditing={() => { this.secondTextInput.focus(); }}
                            blurOnSubmit={false}
                        />
                        <Text style={styles.label}>Last Name</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Last Name"
                            value={lastName}
                            onChangeText={onChangeLastName}
                            ref={(input) => { this.secondTextInput = input; }}
                            returnKeyType="next"
                            onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                        />
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Email"
                            value={email}
                            onChangeText={onChangeEmail}
                            keyboardType="email-address"
                            ref={(input) => { this.thirdTextInput = input; }}
                            returnKeyType="done"
                            onSubmitEditing={() => Keyboard.dismiss()}
                        />
                        <View style={styles.pressableContainer}>
                            <Pressable
                                style={firstName != '' && email != '' && lastName != '' ? styles.buttonActive : styles.buttonDisabled}
                                onPress={handleLogin}
                            >
                                <Text style={styles.buttonText}>Next</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3f6f4",
        width: "100%",
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    innerContainer: {
        flex: 1,
        backgroundColor: "#eeeeee",
        width: "100%",
        // paddingBottom: 250,

    },
    pressableContainer: {
        alignSelf: 'flex-end', // Align to the right
        margin: 10, // Adjust spacing as needed
        marginTop: 20,
    },
    text: {
        fontSize: 30,
        textAlign: 'center',
        padding: 50,
        marginBottom: 10,
    },
    label: {
        textAlign: 'center',
        fontSize: 25,
        marginBottom: 20,
    },
    textInput: {
        height: 40,
        width: 300,
        borderColor: 'black',
        borderWidth: 1.5,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        alignContent: 'center',
        alignSelf: 'center',
    },
    buttonDisabled: {
        backgroundColor: "#bcbcbc",
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 15,
    },
    buttonActive: {
        backgroundColor: "#00c341",
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 15,
    },
    buttonText: {
        fontSize: 22,
    },
});

export default Onboarding;