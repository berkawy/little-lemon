import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import Splash from "../screens/Splash";
import Onboarding from "../screens/Onboarding";

const Stack = createNativeStackNavigator();

function RootNavigator() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const value = await AsyncStorage.getItem('isLoggedIn')
                setIsLoggedIn(value !== "false" && value !== null);
                setIsLoading(false);
            }
            catch (e) {
                console.log(e)
                Alert.alert(`An error occured: ${e.message}`)
                setIsLoading(false);
            }
        }
    
        checkLoggedIn();
    }, []);

    

    if (isLoading) {
        return (
            <Splash />
        )
    }

    else {
        return (
            <Stack.Navigator>
                {isLoggedIn ? (
                    <Stack.Group>
                        <Stack.Screen name='Home' component={Home} />
                        <Stack.Screen name="Profile">
                            {props => <Profile {...props} setIsLoggedIn={setIsLoggedIn} />}
                        </Stack.Screen>
                    </Stack.Group>
                ) : (
                    <Stack.Screen name="Onboarding">
                        {props => <Onboarding {...props} setIsLoggedIn={setIsLoggedIn} />}
                    </Stack.Screen>
                )}
            </Stack.Navigator>
        );
    }


};

export default RootNavigator;