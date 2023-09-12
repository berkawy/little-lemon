import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useRoute } from "@react-navigation/native";

function ProfileHeader({ navigation, ...props }) {
    const route = useRoute();
    return (
        <View style={styles.header}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/footer_logo.png')} resizeMode="contain" />
            </View>
            {route.name != 'Profile' ?
                <Pressable style={styles.circularImageContainer} onPress={() => navigation.navigate('Profile')}>
                    {props.image != null && props.image != '' ?
                        <Image
                            style={styles.circularImage}
                            source={{ uri: props.image }}
                            resizeMode="cover" />
                        :
                        <View style={styles.circularImage}>
                            <Text style={styles.placeholder}>{props.placeHolder}</Text>
                        </View>}
                </Pressable>
                :
                <View style={styles.circularImageContainer} onPress={() => navigation.navigate('Profile')}>
                    {props.image != null && props.image != '' ?
                        <Image
                            style={styles.circularImage}
                            source={{ uri: props.image }}
                            resizeMode="cover" />
                        :
                        <View style={styles.circularImage}>
                            <Text style={styles.placeholder}>{props.placeHolder}</Text>
                        </View>}
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#EDEFEE',
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'row',
        height: 90,
    },
    back: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
        marginLeft: 10,
    },
    logoContainer: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: 200,
        height: 110,
    },
    circularImageContainer: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
        marginRight: 10,
    },
    circularImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        position: 'absolute',
        marginRight: 10,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#9fc5e8",
    },
    placeholder: {
        fontSize: 40,
        color: "#FFFFFF",
    },
});

export default ProfileHeader;