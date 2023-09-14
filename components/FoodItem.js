import React from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";

export default function FoodItem(props) {
    const [isLoading, setIsLoading] = React.useState(true);
    return (
        <>
            <View style={styles.item}>
                <View style={styles.text}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.description}>{props.description}</Text>
                    <Text style={styles.price}>${props.price}</Text>
                </View>
                <View style={styles.image}>
                    <Image
                        style={{ width: 130, height: 130 }}
                        source={{ uri: props.image }}
                        resizeMode="cover"
                        onLoadStart={() => setIsLoading(true)}
                        onLoadEnd={() => setIsLoading(false)}
                    />
                    {isLoading && <ActivityIndicator style={styles.loading} size="small" color="#0000ff" />}
                </View>
            </View>
            <View style={styles.horizontalLine} />
        </>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#FFFFFF",
        padding: 20,
        flex: 1,
        flexDirection: 'row',
    },
    text: {
        flex: 1.5,
    },
    image: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontFamily: "karla-bold",
        padding: 5,
    },
    description: {
        fontSize: 16,
        fontFamily: "karla-regular",
        padding: 5,
    },
    price: {
        fontSize: 16,
        fontFamily: "karla-medium",
        padding: 5,
    },
    horizontalLine: {
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: 1,
    },
    loading: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    });
