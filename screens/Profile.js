import React from "react";
import { View, Text, StyleSheet, Image, Pressable, TextInput, ScrollView, Platform, KeyboardAvoidingView } from "react-native";
import ProfileHeader from "../components/ProfileHeader";
import { Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import { useFocusEffect } from "@react-navigation/native";
import { useHeaderHeight } from '@react-navigation/elements'

function Profile({ navigation }) {
    const [isOrderChecked, setIsOrderChecked] = React.useState(false);
    const [isPasswordChecked, setIsPasswordChecked] = React.useState(false);
    const [isSpecialChecked, setIsSpecialChecked] = React.useState(false);
    const [isNewsletterChecked, setIsNewsletterChecked] = React.useState(false);
    const [image, setImage] = React.useState(null);
    const [firstName, onChangeFirstName] = React.useState('')
    const [lastName, onChangeLastName] = React.useState('')
    const [email, onChangeEmail] = React.useState('')
    const [phoneNumber, onChangePhoneNumber] = React.useState('')
    const [data, setData] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        image: '',
        preferences: {
            isOrderChecked: false,
            isPasswordChecked: false,
            isSpecialChecked: false,
            isNewsletterChecked: false,
        }
    });
    const [changesMade, setChangesMade] = React.useState(false);

    const height = useHeaderHeight()
    const phoneNumberMask = '(999) 999-9999';
    let jsonValue = null;

    const handleInputChange = () => {
        // Check if any of the form inputs have changed
        if (
            firstName !== data.firstName ||
            lastName !== data.lastName ||
            email !== data.email ||
            phoneNumber !== data.phoneNumber ||
            image !== data.image ||
            isOrderChecked !== data.preferences.isOrderChecked ||
            isPasswordChecked !== data.preferences.isPasswordChecked ||
            isSpecialChecked !== data.preferences.isSpecialChecked ||
            isNewsletterChecked !== data.preferences.isNewsletterChecked
        ) {
            setChangesMade(true);
        } else {
            setChangesMade(false);
        }
    };

    const handleFirstNameChange = (text) => {
        onChangeFirstName(text);
        handleInputChange();
    };

    const handleLastNameChange = (text) => {
        onChangeLastName(text);
        handleInputChange();
    };

    const handleEmailChange = (text) => {
        onChangeEmail(text);
        handleInputChange();
    };

    const handlePhoneNumberChange = (formatted, extracted) => {
        handleInputChange();
        onChangePhoneNumber(extracted);
        setData({
            ...data,
            phoneNumber: extracted
        })
    };

    const handleOrderChecked = () => {
        setIsOrderChecked(!isOrderChecked);
        handleInputChange();
    };

    const handlePasswordChecked = () => {
        setIsPasswordChecked(!isPasswordChecked);
        handleInputChange();
    };

    const handleSpecialChecked = () => {
        setIsSpecialChecked(!isSpecialChecked);
        handleInputChange();
    };

    const handleNewsLetterChecked = () => {
        setIsNewsletterChecked(!isNewsletterChecked);
        handleInputChange();
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // await AsyncStorage.setItem('image', result.assets[0].uri);
        if (!result.canceled) {
            handleInputChange();
            setImage(result.assets[0].uri);
        }
    };

    const removeImage = async () => {
        try {
            await AsyncStorage.removeItem('image');
            setImage(null);
            handleInputChange();
        } catch (e) {
            console.log(e);
            Alert.alert(`An error occured: ${e.message}`);
        }
    };

    const saveChanges = async () => {
        try {
            const updatedFirstName = firstName !== '' ? firstName : data.firstName;
            const updatedLastName = lastName !== '' ? lastName : data.lastName;
            const updatedEmail = email !== '' ? email : data.email;
            const updatedPhoneNumber = phoneNumber !== '' ? phoneNumber : data.phoneNumber;
            const updatedImage = image !== null && image != '' ? image : data.image;
            await AsyncStorage.multiSet([
                ['firstName', JSON.stringify(updatedFirstName)],
                ['lastName', JSON.stringify(updatedLastName)],
                ['email', JSON.stringify(updatedEmail)],
                ['phoneNumber', JSON.stringify(updatedPhoneNumber)],
                ['image', image == null ? '' : image],
                ['isOrderChecked', JSON.stringify(isOrderChecked)],
                ['isPasswordChecked', JSON.stringify(isPasswordChecked)],
                ['isSpecialChecked', JSON.stringify(isSpecialChecked)],
                ['isNewsletterChecked', JSON.stringify(isNewsletterChecked)]
            ]);
            Alert.alert('Changes saved successfully');
            setData(
                {
                    firstName: updatedFirstName,
                    lastName: updatedLastName,
                    email: updatedEmail,
                    phoneNumber: updatedPhoneNumber,
                    image: updatedImage,
                    preferences: {
                        isOrderChecked: isOrderChecked,
                        isPasswordChecked: isPasswordChecked,
                        isSpecialChecked: isSpecialChecked,
                        isNewsletterChecked: isNewsletterChecked,
                    }
                }
            );
            setChangesMade(false);
        } catch (e) {
            console.log(e);
            Alert.alert(`An error occured: ${e.message}`);
        }
    };

    const discardChanges = async () => {
        try {
            onChangeFirstName(data.firstName);
            onChangeLastName(data.lastName);
            onChangeEmail(data.email);
            onChangePhoneNumber(data.phoneNumber);
            setImage(data.image);
            setIsOrderChecked(data.preferences.isOrderChecked);
            setIsPasswordChecked(data.preferences.isPasswordChecked);
            setIsSpecialChecked(data.preferences.isSpecialChecked);
            setIsNewsletterChecked(data.preferences.isNewsletterChecked);
            Alert.alert('Changes discarded');
            setChangesMade(false);
        }
        catch (e) {
            console.log(e);
            Alert.alert(`An error occured: ${e.message}`);
        }
    }

    const logout = async () => {
        try {
            await AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
            await AsyncStorage.clear();
            navigation.navigate('Onboarding')
            setData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                image: '',
                preferences: {
                    isOrderChecked: false,
                    isPasswordChecked: false,
                    isSpecialChecked: false,
                    isNewsletterChecked: false,
                }
            });
            onChangeFirstName('');
            onChangeLastName('');
            onChangeEmail('');
            onChangePhoneNumber('');
            setImage(null);
            setIsOrderChecked(false);
            setIsPasswordChecked(false);
            setIsSpecialChecked(false);
            setIsNewsletterChecked(false);
            setChangesMade(false);
        } catch (e) {
            console.log(e);
            Alert.alert(`An error occured: ${e.message}`);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            const getUserData = async () => {
                try {
                    jsonValue = await AsyncStorage.multiGet([
                        'firstName',
                        'email',
                        'lastName',
                        'phoneNumber',
                        'image',
                        'isOrderChecked',
                        'isPasswordChecked',
                        'isSpecialChecked',
                        'isNewsletterChecked',
                    ]);
                    // Rest of your code to set state with fetched data...
                    const retrievedImageURI = jsonValue[4][1] ? jsonValue[4][1] : '';
                    setData({
                        firstName: jsonValue[0][1] ? JSON.parse(jsonValue[0][1]) : '',
                        email: jsonValue[1][1] ? JSON.parse(jsonValue[1][1]) : '',
                        lastName: jsonValue[2][1] ? JSON.parse(jsonValue[2][1]) : '',
                        phoneNumber: jsonValue[3][1] ? JSON.parse(jsonValue[3][1]) : '',
                        image: retrievedImageURI,
                        preferences: {
                            isOrderChecked: jsonValue[5][1] ? JSON.parse(jsonValue[5][1]) : false,
                            isPasswordChecked: jsonValue[6][1] ? JSON.parse(jsonValue[6][1]) : false,
                            isSpecialChecked: jsonValue[7][1] ? JSON.parse(jsonValue[7][1]) : false,
                            isNewsletterChecked: jsonValue[8][1] ? JSON.parse(jsonValue[8][1]) : false,
                        }
                    });
                } catch (e) {
                    console.log(e);
                    Alert.alert(`An error occurred: ${e.message}`);
                }
            };

            getUserData();
        }, []) // The empty dependency array means this effect runs once when the component mounts and every time it is focused
    );

    React.useEffect(() => {
        console.log("here")
        console.log(data);
        const getUserData = async () => {
            try {
                jsonValue = await AsyncStorage.multiGet(
                    [
                        'firstName',
                        'email',
                        'lastName',
                        'phoneNumber',
                        'image',
                        'isOrderChecked',
                        'isPasswordChecked',
                        'isSpecialChecked',
                        'isNewsletterChecked'
                    ]);
            }
            catch (e) {
                console.log(e);
                Alert.alert(`An error occured: ${e.message}`);
                return;
            } finally {
                const retrievedImageURI = jsonValue[4][1] ? jsonValue[4][1] : '';
                setData({
                    firstName: jsonValue[0][1] ? JSON.parse(jsonValue[0][1]) : '',
                    email: jsonValue[1][1] ? JSON.parse(jsonValue[1][1]) : '',
                    lastName: jsonValue[2][1] ? JSON.parse(jsonValue[2][1]) : '',
                    phoneNumber: jsonValue[3][1] ? JSON.parse(jsonValue[3][1]) : '',
                    image: retrievedImageURI,
                    preferences: {
                        isOrderChecked: jsonValue[5][1] ? JSON.parse(jsonValue[5][1]) : false,
                        isPasswordChecked: jsonValue[6][1] ? JSON.parse(jsonValue[6][1]) : false,
                        isSpecialChecked: jsonValue[7][1] ? JSON.parse(jsonValue[7][1]) : false,
                        isNewsletterChecked: jsonValue[8][1] ? JSON.parse(jsonValue[8][1]) : false,
                    }
                });
                setIsOrderChecked(jsonValue[5][1] ? JSON.parse(jsonValue[5][1]) : false);
                setIsPasswordChecked(jsonValue[6][1] ? JSON.parse(jsonValue[6][1]) : false);
                setIsSpecialChecked(jsonValue[7][1] ? JSON.parse(jsonValue[7][1]) : false);
                setIsNewsletterChecked(jsonValue[8][1] ? JSON.parse(jsonValue[8][1]) : false);
                if (retrievedImageURI === '') {
                    setImage(null); // Set image state to null or some default image
                } else {
                    setImage(retrievedImageURI);
                }
            }
        }
        getUserData();
    }, []);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container} keyboardVerticalOffset={height}>
            <ProfileHeader image={image} placeHolder={data.firstName.charAt(0).toUpperCase() + data.lastName.charAt(0).toUpperCase()} />
            <ScrollView keyboardDismissMode="on-drag" style={styles.container}>
                <Text style={styles.headerText}>Personal information</Text>
                <Text style={styles.text}>Avatar</Text>
                <View style={styles.imageRow}>
                    <View style={styles.imageContainer}>
                        {image != null && image != '' ? <Image style={styles.image} source={{ uri: image }} resizeMode="cover" /> : <View style={styles.image}><Text style={styles.placeholder}>{data.firstName.charAt(0).toUpperCase() + data.lastName.charAt(0).toUpperCase()}</Text></View>}

                    </View>
                    <View style={styles.editContainer}>
                        <Pressable style={styles.editButton} onPress={pickImage}>
                            <Text style={styles.editText}>Change</Text>
                        </Pressable>
                        <Pressable style={styles.removeButton} onPress={removeImage}>
                            <Text style={styles.removeText}>Remove</Text>
                        </Pressable>
                    </View>
                </View>
                <Text style={styles.text}>First Name</Text>
                <TextInput style={styles.input} value={firstName} onChangeText={handleFirstNameChange} placeholder={data.firstName != '' ? data.firstName : 'First Name'} />
                <Text style={styles.text}>Last Name</Text>
                <TextInput style={styles.input} value={lastName} onChangeText={handleLastNameChange} placeholder={data.lastName != '' ? data.lastName : 'Last Name'} />
                <Text style={styles.text}>Email</Text>
                <TextInput style={styles.input} value={email} onChangeText={handleEmailChange} keyboardType="email-address" placeholder={data.email != '' ? data.email : 'Email'} />
                <Text style={styles.text}>Phone Number</Text>
                <MaskedTextInput mask={phoneNumberMask} style={styles.input} value={phoneNumber} onChangeText={handlePhoneNumberChange} keyboardType="numeric" placeholder={data.phoneNumber != '' ? data.phoneNumber : '(123) 456-7890'} />
                <Text style={styles.headerText}>Email notifications</Text>
                <View style={styles.checkboxContainer}>
                    <View style={styles.checkbox}>
                        <Checkbox status={isOrderChecked ? 'checked' : 'unchecked'} onPress={handleOrderChecked} />
                    </View>
                    <View style={styles.checkboxText}>
                        <Text>Order Statuses</Text>
                    </View>
                </View>
                <View style={styles.checkboxContainer}>
                    <View style={styles.checkbox}>
                        <Checkbox status={isPasswordChecked ? 'checked' : 'unchecked'} onPress={handlePasswordChecked} />
                    </View>
                    <View style={styles.checkboxText}>
                        <Text>Password changes</Text>
                    </View>
                </View>
                <View style={styles.checkboxContainer}>
                    <View style={styles.checkbox}>
                        <Checkbox status={isSpecialChecked ? 'checked' : 'unchecked'} onPress={handleSpecialChecked} />
                    </View>
                    <View style={styles.checkboxText}>
                        <Text>Special offers</Text>
                    </View>
                </View>
                <View style={styles.checkboxContainer}>
                    <View style={styles.checkbox}>
                        <Checkbox status={isNewsletterChecked ? 'checked' : 'unchecked'} onPress={handleNewsLetterChecked} />
                    </View>
                    <View style={styles.checkboxText}>
                        <Text>Newsletter</Text>
                    </View>
                </View>
                <Pressable style={styles.logoutButton} onPress={logout}>
                    <Text style={styles.logoutText}>Log out</Text>
                </Pressable>
                <View style={styles.saveContainer}>
                    <Pressable style={[styles.saveButton, !changesMade && styles.disabledSaveButton]} onPress={saveChanges} disabled={!changesMade}>
                        <Text style={styles.editText}>Save changes</Text>
                    </Pressable>
                    <Pressable style={[styles.discardButton, !changesMade && styles.disabledDiscardButton]} onPress={discardChanges} disabled={!changesMade}>
                        <Text style={styles.discardText}>Discard changes</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
        margin: 20,
    },
    text: {
        fontSize: 16,
        color: "#BCBCBC",
        marginLeft: 20,
        marginBottom: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: 20,
        backgroundColor: "#9fc5e8",
        alignItems: "center",
        justifyContent: "center",
    },
    placeholder: {
        fontSize: 40,
        color: "#FFFFFF",
    },
    imageRow: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'row',
        height: 90,
        marginBottom: 20,
    },
    imageContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",

    },
    editContainer: {
        flex: 2,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: 'row',
    },
    editButton: {
        backgroundColor: "#999999",
        borderRadius: 10,
        width: 80,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
        borderWidth: 1,
        borderColor: "#000000",
    },
    removeButton: {
        backgroundColor: "#EDEFEE",
        borderRadius: 10,
        width: 80,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
        borderColor: "#000000",
        borderWidth: 1,
    },
    editText: {
        fontSize: 14,
        color: "#FFFFFF",
    },
    removeText: {
        fontSize: 14,
        color: "#000000",
    },
    discardText: {
        fontSize: 14,
        color: "#FFFFFF",
    },
    input: {
        backgroundColor: "#FFFFFF",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#000000",
        marginHorizontal: 20,
        marginBottom: 20,
        height: 40,
        paddingLeft: 10,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginBottom: 20
    },
    checkbox: {
        flex: 0.5,
        borderColor: "#000000",
        borderWidth: 1,
    },
    checkboxText: {
        flex: 5,
        marginLeft: 10,

    },
    logoutButton: {
        backgroundColor: "#ffcc44",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
    },
    logoutText: {
        fontSize: 16,
        color: "#000000",
        margin: 15,
        fontWeight: "bold",
    },
    saveContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: "#6aa84f",
        borderRadius: 10,
        width: 110,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
        borderWidth: 1,
        borderColor: "#000000",
    },
    discardButton: {
        backgroundColor: "#f44336",
        borderRadius: 10,
        width: 130,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
        borderWidth: 1,
        borderColor: "#000000",
    },
    disabledSaveButton: {
        backgroundColor: "#bcbcbc",
        borderRadius: 10,
        width: 110,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
        borderWidth: 1,
        borderColor: "#000000",
    },
    disabledDiscardButton: {
        backgroundColor: "#bcbcbc",
        borderRadius: 10,
        width: 130,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
        borderWidth: 1,
        borderColor: "#000000",
    },
});

export default Profile;