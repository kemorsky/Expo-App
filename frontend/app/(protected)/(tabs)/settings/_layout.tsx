import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useAuth } from '@/utils/AuthContext';
import { useTranslation } from 'react-i18next';

export default function SettingsLayout() {
  const { user } = useAuth();
  const { t } = useTranslation();
  
  if (!user?.token && !user?.refreshToken) {
    console.log('get a token you bum')
    return <Redirect href="/SignIn" />;
  }

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
        <Stack.Screen name="index" options={{ title: t('tabs.tabSettings') }} />
        <Stack.Screen name="language" options={{ title: t('tabs.settings.language') }} />
        <Stack.Screen name="theme" options={{ title: t('tabs.settings.theme') }} />
        <Stack.Screen name="max-challenges" options={{ title: t('tabs.settings.maxChallenges') }} />
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
    
  );
}
