import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/utils/AuthContext';

export default function HomeLayout() {
  const { user } = useAuth();
  
  if (!user?.token && !user?.refreshToken) {
    console.log('get a token you bum')
    return <Redirect href="/Login" />;
  }

  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="accept-challenge" options={{ title: 'Accept Challenge' }} />
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
