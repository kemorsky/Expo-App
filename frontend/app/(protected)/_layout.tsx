import { useState } from "react";
import { ThemeProvider } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useAuth } from "@/utils/AuthContext";
import { useThemeConfig } from "@/hooks/useThemeConfig";
import { BottomSheet, BottomSheetController } from "@/components/shared/BottomSheet";
import { BottomSheetViewChallenge } from "../../components/shared/BottomSheetViewChallenge";
import { BottomSheetContext, BottomSheetState } from "@/utils/BottomSheetContext";
import { BottomSheetCreateChallenge } from "@/components/shared/BottomSheetCreateChallenge";

export default function ProtectedLayout() {
  const { theme } = useThemeConfig();
  const { user } = useAuth();

  const [ sheetController, setSheetController ] = useState<BottomSheetController | null>(null); // gesture and behavior controller
  const [ sheetState, setSheetState ] = useState<BottomSheetState>({ mode: null, challenge: null });
  
  if (!user?.token && !user?.refreshToken) {
    return <Redirect href="/SignIn" />;
  }

  return (
    <ThemeProvider value={theme}>
      <BottomSheetContext.Provider  
        value={{
        state: sheetState,
        setState: setSheetState,
        controller: sheetController
      }}>
        <SafeAreaProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          <BottomSheet controller={setSheetController}>
            {sheetState.mode === "viewChallenge" && <BottomSheetViewChallenge/>}
            {sheetState.mode === "createChallenge" && <BottomSheetCreateChallenge/>}
          </BottomSheet>
          <StatusBar style="auto" />
        </SafeAreaProvider>
      </BottomSheetContext.Provider>
    </ThemeProvider>
  );
}
