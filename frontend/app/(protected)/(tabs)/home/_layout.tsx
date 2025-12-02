import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '@/utils/AuthContext';

export default function HomeLayout() {
  const colorScheme = useColorScheme();
  const { user } = useAuth();
  
  if (!user?.token && !user?.refreshToken) {
    console.log('get a token you bum')
    return <Redirect href="/Login" />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Home' }} />
        </Stack>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
