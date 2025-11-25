import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '@/utils/AuthContext';

export default function SettingsLayout() {
  const colorScheme = useColorScheme();
  const { user } = useAuth();
  
  if (!user?.token && !user?.refreshToken) {
    console.log('get a token you bum')
    return <Redirect href="/Login" />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
          <Stack.Screen name="index" options={{ title: 'Settings' }} />
          <Stack.Screen name="manage-account" options={{ headerShown: true, title: 'Manage Account' }} />
        </Stack>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
