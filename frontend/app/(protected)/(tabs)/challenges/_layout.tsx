import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useAuth } from '@/utils/AuthContext';

export default function ChallengesLayout() {
  const { user } = useAuth();

  if (!user?.token && !user?.refreshToken) {
    console.log('get a token you bum')
    return <Redirect href="/Login" />;
  }

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
        <Stack.Screen name="index" options={{ title: 'Challenges' }} />
        <Stack.Screen name="create-challenge" options={{ title: 'Create Challenge' }} />
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
