import { useMe } from '@/lib/api/user/userQueries';
import { router } from "expo-router";
import { useEffect } from "react";

export default function IndexRedirect() {
    // ========== This logic will eventually land in SplashScreen when its time comes ==========
    const { user, loading } = useMe();

    useEffect(() => {
        const checkOnboarding = () => {
            if (!user || loading) return null;
            if (!user) { router.replace('/SignIn') }
            if (user.onboarded) {
                router.replace('/home')
            } else {
                router.replace('/Onboarding')
            }
        }

        checkOnboarding();
    }, []);
}