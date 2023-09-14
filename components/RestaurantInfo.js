import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Searchbar } from 'react-native-paper';
import { useFonts } from "expo-font";
import customFonts from '../expo-fonts'

function RestaurantInfo() {
    const [] = useFonts({
        'markazi': customFonts['markazi'],
        'karla': customFonts['karla'],
    });

    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Little Lemon</Text>
            <View style={styles.topContainer}>
                <View style={styles.leftContainer}>
                    <Text style={styles.subText}>Chicago</Text>
                    <Text style={styles.leadText}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist. </Text>
                </View>
                <View style={styles.rightContainer}>
                    <View style={styles.imageContainer}>
                        <Image source={require('../assets/Images/Hero_image.png')} style={styles.image} resizeMode="center" />
                    </View>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <Searchbar placeholder="Search" onChangeText={onChangeSearch} value={searchQuery} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0.65,
        backgroundColor: "#596055",
        width: "100%",
        justifyContent: 'flex-start',
    },
    topContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    bottomContainer: {
        margin: 20,
    },
    leftContainer: {
        flex: 1,
    },
    rightContainer: {
        flex: 1,
        alignItems: 'center',
        marginRight: -20,
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 64,
        color: "#F4CE14",
        marginTop: 10,
        marginLeft: 20,
        fontFamily: 'markazi',
    },
    subText: {
        fontSize: 40,
        color: "#EDEFEE",
        marginTop: -20,
        paddingLeft: 20,
        fontFamily: 'markazi',
    },
    leadText: {
        fontSize: 18,
        color: "#EDEFEE",
        marginTop: 10,
        paddingLeft: 20,
        fontFamily: 'karla-medium',
    },
    imageContainer: {
        width: 150,
        height: 170,
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    }
});

export default RestaurantInfo;