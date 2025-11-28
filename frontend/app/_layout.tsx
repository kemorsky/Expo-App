import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from '@/utils/AuthProvider';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import '../utils/i18n'
// import SplashController from './splash';
import { ApolloProvider } from "@apollo/client/react";
import { client } from "@/utils/client";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';

export default function Root() {

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <RootLayout />
        {/* <SplashController /> */}
      </AuthProvider>
    </ApolloProvider>
  )
}

function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    MontserratBold: require('../assets/fonts/Montserrat-Bold.ttf'),
    MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf'),
    MontserratSemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
    PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <StatusBar style="auto" />
          <Stack>
            <Stack.Screen
              name="Login"
              options={{
                headerShown: false,
                animation: "none"
            }} />
            <Stack.Screen
              name="SignUp"
              options={{
                headerShown: false,
                animation: "none"
            }} />
            <Stack.Screen
              name="(protected)"
              options={{
                headerShown: false,
                animation: "default",
            }} />
            {/* <Stack.Screen name="onboarding" /> */}
          </Stack>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}