import { ThemeProvider } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '@/utils/AuthProvider';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import '../utils/i18n'
// import SplashController from './splash';
import { ApolloProvider } from "@apollo/client/react";
import { client } from "@/utils/client";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { ThemeConfigProvider, useThemeConfig } from '@/hooks/useThemeConfig';

export default function Root() {

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <ThemeConfigProvider>
          <RootLayout />
          {/* <SplashController /> */}
        </ThemeConfigProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}

function RootLayout() {
  const { theme } = useThemeConfig();
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
    <ThemeProvider value={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <StatusBar style="auto" />
          <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
            <Stack.Screen
              name="SignIn"
              options={{
                title: "Sign In",
                animation: "default",
                headerShown: false,
            }} />
            <Stack.Screen
              name="SignUp"
              options={{
                title: "Sign Up",
                animation: "default"
            }} />
            <Stack.Screen
              name="ForgottenPassword"
              options={{
                title: "Forgotten Password",
                animation: "default"
            }} />
            <Stack.Screen
              name="reset-password"
              options={{
                title: "Reset Password",
                animation: "default",
                headerShown: false,
            }} />
            <Stack.Screen
              name="(protected)"
              options={{
                headerShown: false,
                animation: "default",
            }} />
            <Stack.Screen 
              name="Onboarding"
              options={{
                headerShown: false,
                animation: "default"
            }} />
          </Stack>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}