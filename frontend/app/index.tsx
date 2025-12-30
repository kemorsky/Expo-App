import { useMe } from '@/lib/api/user/userQueries';
import { router } from "expo-router";
import { useEffect } from "react";

export default function IndexRedirect() {
    const { user, loading } = useMe();

    useEffect(() => {
        const checkOnboarding = () => {
            if (!user || loading) return null;
            if (user.onboarded) {
                router.replace('/home')
            } else {
                router.replace('/Onboarding')
            }
        }

        checkOnboarding();
    }, [user, loading]);
}