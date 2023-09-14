import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Order() {

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>ORDER FOR DELIVERY!</Text>
            <View style={styles.topContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.sectionText}>Starters</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.sectionText}>Mains</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.sectionText}>Desserts</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.sectionText}>Drinks</Text>
                </View>
            </View>
            <View style={styles.horizontalLine}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0.35,
        backgroundColor: "#FFFFFF",
        width: "100%",
        justifyContent: 'flex-start',
    },
    headerText: {
        fontSize: 20,
        fontFamily: 'karla-extra-bold',
        padding: 20,
    },
    topContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    textContainer: {
        marginTop: 10,
        marginLeft: 20,
        backgroundColor: "#e6e6e6",
        borderRadius: 10,
    },
    sectionText: {
        fontSize: 16,
        fontFamily: 'karla-extra-bold',
        padding: 8,
    },
    horizontalLine: {
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: 1,
        marginTop: 40,
    },
});

export default Order;