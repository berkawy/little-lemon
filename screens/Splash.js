// First screen of the app, loads the data from the API and saves it to the database on the first lauch of the app
// Fetches data from the database for subsequent launches

import React from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { createTable, dropTable, getMenuItems, saveMenuItems } from "../utils/database";
import { getFlatListData } from "../utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import customFonts from '../utils/expo-fonts'
import * as Font from 'expo-font';

export default function Splash({setIsLoading, setMenuData, setIsLoggedIn}) {

    // Function to fetch data from the API
    const getMenuData = async () => {
        try {
            const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
            const json = await response.json();
            return json.menu;
        } catch (e) {
            console.log(e)
            Alert.alert(`An error occurred: ${e.message}`);
        }
    }

    // Function to fetch images from the API
    async function fetchImages(menuItems) {
        const updatedMenuItems = await Promise.all(
            menuItems.map(async (item) => {
                try {
                    const imageUrl = `https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/images/${item.image}?raw=true`;
                    const imageResponse = await fetch(imageUrl);
                    // If the image is found, set the image property of the item to the image URL
                    if (imageResponse.ok) {
                        const contentType = imageResponse.headers.get('content-type');
                        if (contentType) {
                            item.image = imageUrl
                        }
                        // if the image exists but corrupted, set the image property of the item to a placeholder image
                        else {
                            item.image = 'https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'
                        }
                    }
                    // if the image does not exist on the server, set the image property of the item to a placeholder image
                    else {
                        item.image = 'https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'
                    }

                } catch (e) {
                    console.log(`Error fetching image for ${item.name}: ${e.message}`);
                }
                return item;
            })
        );

        return updatedMenuItems;
    }

    // Function to check if the user is logged in
    const checkLoggedIn = async () => {
        try {
            const value = await AsyncStorage.getItem('isLoggedIn')
            setIsLoggedIn(value !== "false" && value !== null);
            await loadFonts();
        }
        catch (e) {
            console.log(e)
            Alert.alert(`An error occured: ${e.message}`)
        }
    }

    // Function to load custom fonts
    const loadFonts = async () => {
        try {
            await Font.loadAsync(customFonts)
        } catch (e) {
            console.log(e)
        }
    }

    // Used to load the data from the API and save it to the database on the first launch of the app
    // Used to fetch data from the database for subsequent launches
    React.useEffect(() => {
        (async () => {
            try {
                // await dropTable();
                await createTable();
                let menuItems = await getMenuItems();
                if (!menuItems.length || menuItems.length == 0) {
                    menuItems = await getMenuData();
                    menuItems = await fetchImages(menuItems);
                    saveMenuItems(menuItems);
                }
                const flatListData = getFlatListData(menuItems);
                setMenuData(flatListData);
            } catch (e) {
                console.log(e)
                Alert.alert(`An error occurred: ${e.message}`);

            } finally{
                await checkLoggedIn();
                setIsLoading(false);
            }
        })();
    }, [])
    

    return (
        <View style={styles.container}>
            <Image source={require('../assets/Images/logo.png')} style={styles.logo} resizeMode="contain"/>
            <Text style={styles.text}>Welcome to Little Lemon</Text>
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#333333" />
                <Text style={styles.loadingText}>Loading, this might take a while...</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDEFEE',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 200,
        height: 200,
    },
    text: {
        color: '#333333',
        fontSize: 30
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    loadingText: {
        color: '#333333',
        fontSize: 15,
        marginLeft: 10
    },
});    