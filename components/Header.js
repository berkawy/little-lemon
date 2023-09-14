import React from "react";
import {StyleSheet, Image } from "react-native";

const Header = () => {
    return (
            <Image style={styles.logo} source={require('../assets/Images/footer_logo.png')} resizeMode="contain" />
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 110,
    }
});

export default Header;