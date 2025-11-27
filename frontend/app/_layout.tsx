import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from '@/utils/AuthProvider';
// import SplashController from './splash';
import { ApolloProvider } from "@apollo/client/react";
import { client } from "@/utils/client";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    MontserratBold: require('../assets/fonts/Montserrat-Bold.ttf'),
    MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf'),
    MontserratSemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
    RobotoBold: require('../assets/fonts/Roboto-Bold.ttf'),
    RobotoMedium: require('../assets/fonts/Roboto-Medium.ttf'),
    RobotoRegular: require('../assets/fonts/Roboto-Regular.ttf'),
    RobotoSemiBold: require('../assets/fonts/Roboto-SemiBold.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{flex: 1}}>
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