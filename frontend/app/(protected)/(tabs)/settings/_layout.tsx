import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useAuth } from '@/utils/AuthContext';

export default function SettingsLayout() {
  const { user } = useAuth();
  
  if (!user?.token && !user?.refreshToken) {
    console.log('get a token you bum')
    return <Redirect href="/SignIn" />;
  }

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
        <Stack.Screen name="index" options={{ title: 'Settings' }} />
        <Stack.Screen name="manage-account" options={{ title: 'Manage Account' }} />
        <Stack.Screen name="language" options={{ title: 'Language' }} />
        <Stack.Screen name="theme" options={{ title: 'Theme' }} />
        <Stack.Screen name="max-challenges" options={{ title: 'Max Challenges Per Day' }} />
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
    
  );
}
