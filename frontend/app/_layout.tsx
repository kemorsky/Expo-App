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
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider style={{overflow: 'scroll'}}>
        <Stack>
          <Stack.Screen
            name="login"
            options={{
              headerShown: false,
              animation: "none"
          }} />
          <Stack.Screen
            name="signIn"
            options={{
              headerShown: false,
              animation: "none"
          }} />
<          Stack.Screen
            name="(protected)"
            options={{
              headerShown: false,
              animation: "none",
          }} />
          <Stack.Screen name="onboarding" />
        </Stack>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}