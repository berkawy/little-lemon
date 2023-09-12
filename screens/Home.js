import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { useHeaderHeight } from '@react-navigation/elements'
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileHeader from "../components/ProfileHeader";
import { Alert } from "react-native";
import RestaurantInfo from "../components/RestaurantInfo";
import Order from "../components/Order";
import { useFocusEffect } from "@react-navigation/native";

function Home({navigation}) {
    const [image, setImage] = React.useState(null)
    const height = useHeaderHeight();
    const [data, setData] = React.useState({
        firstName: '',
        lastName: '',
    });
    React.useEffect(() => {
        const getData = async () => {
            let jsonValue = null;
            try {
                jsonValue = await AsyncStorage.multiGet(['firstName', 'lastName', 'image'])
            } catch (e) {
                console.log(e)
                Alert.alert(`An error occurred: ${e.message}`);
            } finally {
                const retrievedImageURI = jsonValue[2][1] ? jsonValue[2][1] : '';
                retrievedImageURI != '' && retrievedImageURI != null && retrievedImageURI != undefined ? setImage(retrievedImageURI) : setImage(null)
                setData({
                    firstName: jsonValue[0][1] ? JSON.parse(jsonValue[0][1]) : '',
                    lastName: jsonValue[1][1] ? JSON.parse(jsonValue[1][1]) : '',
                })
            }
        }
        getData();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            const getData = async () => {
                let jsonValue = null;
                try {
                    jsonValue = await AsyncStorage.multiGet(['firstName', 'lastName', 'image'])
                } catch (e) {
                    console.log(e)
                    Alert.alert(`An error occurred: ${e.message}`);
                } finally {
                    const retrievedImageURI = jsonValue[2][1] ? jsonValue[2][1] : '';
                    retrievedImageURI != '' && retrievedImageURI != null && retrievedImageURI != undefined ? setImage(retrievedImageURI) : setImage(null)
                    setData({
                        firstName: jsonValue[0][1] ? JSON.parse(jsonValue[0][1]) : '',
                        lastName: jsonValue[1][1] ? JSON.parse(jsonValue[1][1]) : '',
                    })
                }
            }
            getData();
        }, [])
    );
    

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container} keyboardVerticalOffset={height}>
            <ProfileHeader navigation={navigation} image={image} placeHolder={data.firstName.charAt(0).toUpperCase() + data.lastName.charAt(0).toUpperCase()} />
            <ScrollView style={styles.container}>
                <RestaurantInfo />
                <Order />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3f6f4",
        width: "100%",
    },
});

export default Home;
