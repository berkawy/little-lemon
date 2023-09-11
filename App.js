import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Onboarding from './screens/Onboarding';
import Profile from './screens/Profile';
import Splash from './screens/Splash';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const Stack = createNativeStackNavigator();



export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  let status = false
  React.useEffect(() => {
    const checkLoggedIn = async () => {
      console.log('useEffect')
      try {
        const value = await AsyncStorage.getItem('isLoggedIn')
        if (value != "false" && value != null) {
          setIsLoggedIn(true);
        }
        setIsLoading(false);
        console.log(isLoggedIn)
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
    return <Splash />
  }
  else {
    return (
      <NavigationContainer>
        {console.log(isLoggedIn)}

        <Stack.Navigator screenOptions={{
          headerLeft: () => null,
          headerBackVisible: false,
          gestureEnabled: false,
        }}
          initialRouteName={isLoggedIn ? 'Profile' : 'Onboarding'}>
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
