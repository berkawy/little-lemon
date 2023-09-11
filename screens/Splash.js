import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function Splash() {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain"/>
            <Text style={styles.text}>Welcome to Little Lemon</Text>
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
        width: 300,
        height: 300,
        marginBottom: 10
    },
    text: {
        color: '#333333',
        fontSize: 30
    }
});    