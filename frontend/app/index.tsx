import { useMe } from "@/api/user/userQueries";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";

export default function IndexRedirect() {
    // ========== This logic would land in SplashScreen but Expo Go makes it much harder ==========
    const { user, loading } = useMe();
    
    useEffect(() => {
        if (loading) return;

        if (!user) { 
            router.replace("/SignIn");
            return;
        }

        if (user.onboarded) {
            router.replace("/home")
        } else {
            router.replace("/Onboarding")
        }

        
    }, [user, loading]);

    return <ActivityIndicator />;
}