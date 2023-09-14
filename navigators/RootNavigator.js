import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Splash from "../screens/Splash";
import Onboarding from "../screens/Onboarding";

const Stack = createNativeStackNavigator();

function RootNavigator() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [menuData, setMenuData] = React.useState([]);

    const updateIsLoading = (loadingStatus) => {
        setIsLoading(loadingStatus);
    };

    const updateMenuData = (menuData) => {
        setMenuData(menuData);
    };

    if (isLoading) {
        return (
            <Splash setIsLoading={updateIsLoading} setMenuData={updateMenuData} setIsLoggedIn={setIsLoggedIn} />
        )
    }

    else {
        return (
            <Stack.Navigator>
                {isLoggedIn ? (
                    <Stack.Group>
                        <Stack.Screen name='Home'>
                            {props => <Home {...props} menuData={menuData}/>}
                        </Stack.Screen>

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