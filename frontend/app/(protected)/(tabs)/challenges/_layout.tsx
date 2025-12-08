import { createContext, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { BottomSheet, BottomSheetController } from '@/components/BottomSheet';
import 'react-native-reanimated';
import { useAuth } from '@/utils/AuthContext';

export const BottomSheetContext = createContext({ // determines the content of the bottom sheet
    setContent: (_: React.ReactNode) => {},
    controller: null as BottomSheetController | null,
});

export default function ChallengesLayout() {
  const { user } = useAuth();

  const [ sheetController, setSheetController ] = useState<BottomSheetController | null>(null); // gesture and behavior controller

  const [ sheetContent, setSheetContent ] = useState<React.ReactNode>(null); // determines the content of the bottom sheet

  if (!user?.token && !user?.refreshToken) {
    console.log('get a token you bum')
    return <Redirect href="/Login" />;
  }

  return (
    <BottomSheetContext.Provider  value={{
                                  setContent: setSheetContent,
                                  controller: sheetController}}
    >
      <SafeAreaProvider>
        <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
          <Stack.Screen name="index" options={{ title: 'Challenges' }} />
          <Stack.Screen name="create-challenge" options={{ title: 'Create Challenge' }} />
        </Stack>
        <BottomSheet controller={setSheetController}>
          {sheetContent}
        </BottomSheet>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </BottomSheetContext.Provider>
  );
}
