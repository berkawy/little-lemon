// File responsible for navigation between screens

import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Splash from "../screens/Splash";
import Onboarding from "../screens/Onboarding";
import { FilterProvider } from "../utils/FilterContext";

const Stack = createNativeStackNavigator();

function RootNavigator() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [menuData, setMenuData] = React.useState([]);

    // Function to update the loading status on the splash screen
    const updateIsLoading = (loadingStatus) => {
        setIsLoading(loadingStatus);
    };

    // Function to update the menu data after getting fetched from the database or api
    const updateMenuData = (menuData) => {
        setMenuData(menuData);
    };

    // If the loading is true, then the splash screen will be displayed
    if (isLoading) {
        return (
            <Splash setIsLoading={updateIsLoading} setMenuData={updateMenuData} setIsLoggedIn={setIsLoggedIn} />
        )
    }

    // If the loading is false, then if first time to launch, onBoarding screen will be displayed else Home screen will be displayed
    else {
        return (
            <FilterProvider setMenuData={setMenuData}>
                <Stack.Navigator>
                    {isLoggedIn ? (
                        <Stack.Group>
                            <Stack.Screen name='Home'>
                                {props => <Home {...props} menuData={menuData} setMenuData={setMenuData} />}
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
            </FilterProvider>
        );
    }


};

export default RootNavigator;