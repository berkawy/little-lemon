import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Header = () => {
    return (
            <Image style={styles.logo} source={require('../assets/footer_logo.png')} resizeMode="contain" />
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 110,
    }
});

export default Header;