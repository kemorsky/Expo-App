import { createContext, useState } from 'react';
import { ThemeProvider } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useAuth } from '@/utils/AuthContext';
import { useThemeConfig } from '@/hooks/useThemeConfig';
import { BottomSheet, BottomSheetController } from '@/components/BottomSheet';

export const BottomSheetContext = createContext({ // determines the content of the bottom sheet
    setContent: (_: React.ReactNode) => {},
    controller: null as BottomSheetController | null,
});

export default function ProtectedLayout() {
  const { theme } = useThemeConfig();
  const { user } = useAuth();

  const [ sheetController, setSheetController ] = useState<BottomSheetController | null>(null); // gesture and behavior controller

  const [ sheetContent, setSheetContent ] = useState<React.ReactNode>(null); // determines the content of the bottom sheet
  
  if (!user?.token && !user?.refreshToken) {
    console.log('get a token you bum')
    return <Redirect href="/Login" />;
  }

  return (
    <ThemeProvider value={theme}>
      <BottomSheetContext.Provider  value={{
                                        setContent: setSheetContent,
                                        controller: sheetController}}
      >
        <SafeAreaProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          <BottomSheet controller={setSheetController}>
            {sheetContent}
          </BottomSheet>
          <StatusBar style="auto" />
        </SafeAreaProvider>
      </BottomSheetContext.Provider>
    </ThemeProvider>
  );
}
