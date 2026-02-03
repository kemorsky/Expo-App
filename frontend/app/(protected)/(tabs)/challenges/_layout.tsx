import { SafeAreaProvider } from "react-native-safe-area-context";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useAuth } from "@/utils/AuthContext";
import { useTranslation } from "react-i18next";

export default function ChallengesLayout() {
  const { user } = useAuth();
  const { t } = useTranslation();

  if (!user?.token && !user?.refreshToken) {
    return <Redirect href="/SignIn" />;
  }

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerBackButtonDisplayMode: "minimal" }}>
        <Stack.Screen name="index" options={{ title: t("tabs.tabChallenges") }} />
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
