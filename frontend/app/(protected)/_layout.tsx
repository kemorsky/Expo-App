import { useState } from "react";
import { ThemeProvider } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useAuth } from "@/utils/AuthContext";
import { useThemeConfig } from "@/hooks/useThemeConfig";
import { BottomSheet, BottomSheetController } from "@/components/shared/BottomSheet";
import { BottomSheetContent } from "../../components/shared/BottomSheetContent";
import { BottomSheetContext, BottomSheetState } from "@/utils/BottomSheetContext";

export default function ProtectedLayout() {
  const { theme } = useThemeConfig();
  const { user } = useAuth();

  const [ sheetController, setSheetController ] = useState<BottomSheetController | null>(null); // gesture and behavior controller
  const [sheetState, setSheetState] = useState<BottomSheetState>({ challenge: null });
  
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
            <BottomSheetContent/>
          </BottomSheet>
          <StatusBar style="auto" />
        </SafeAreaProvider>
      </BottomSheetContext.Provider>
    </ThemeProvider>
  );
}
