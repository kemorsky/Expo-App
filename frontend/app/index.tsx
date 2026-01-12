import { useMe } from '@/lib/api/user/userQueries';
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator } from 'react-native';

export default function IndexRedirect() {
    // ========== This logic will eventually land in SplashScreen when its time comes ==========
    const { user, loading } = useMe();
    
    useEffect(() => {
        if (loading) return;

        if (!user) { 
            router.replace('/SignIn');
            return;
        }

        if (user.onboarded) {
            router.replace('/home')
        } else {
            router.replace('/Onboarding')
        }

        
    }, [user, loading]);

    return <ActivityIndicator />;
}