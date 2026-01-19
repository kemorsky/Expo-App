import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useAuth } from '@/utils/AuthContext';
import { useTranslation } from 'react-i18next';

export default function ChallengesLayout() {
  const { user } = useAuth();
  const { t } = useTranslation();

  if (!user?.token && !user?.refreshToken) {
    console.log('get a token you bum')
    return <Redirect href="/SignIn" />;
  }

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
        <Stack.Screen name="index" options={{ title: t('tabs.tabChallenges') }} />
        <Stack.Screen name="create-challenge" options={{ title: t('tabs.challenges.createButton') }} />
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
