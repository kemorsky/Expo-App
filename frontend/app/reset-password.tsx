import { useRef, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useResetPassword } from '@/lib/api/user/userMutations';
import { Wrapper } from '@/components/shared/Wrapper';
import { Container } from '@/components/shared/Container';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalStyles } from '@/styles/globalStyles';
import { ThemedText } from '@/components/ThemedText';
import { Pressable, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function ResetPassword() {
    const { resetPassword, error } = useResetPassword();
    const { t } = useTranslation();
    const globalStyles = useGlobalStyles();
    const [ uiError, setUiError ] = useState<string | null>(null);
    const [ showPassword, setShowPassword ] = useState(false);
    const { token } = useLocalSearchParams<{ token: string }>();
    const inputRef = useRef({
        newPassword: '',
        confirmNewPassword: ''
    });

    const handleResetPassword = async () => {
        const { newPassword, confirmNewPassword } = inputRef.current;

        if (newPassword !== confirmNewPassword) {
            setUiError("Passwords must match");
            return;
        }

        const data = await resetPassword(token, newPassword);
        if (!data) {
            console.error("Could not reset password");
            return;
        }

        router.push("/SignIn");
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    };
    
    return (
        <SafeAreaView>
            <Wrapper>
                <View style={[globalStyles.container, { }]}>
                    <ThemedText type="title">{t('resetPassword.title')}</ThemedText>
                    <View style={{height: 46}}>
                        {error && <ThemedText type="error">{error.message}</ThemedText>}
                        <ThemedText>
                            {uiError && <ThemedText type="error">{uiError}</ThemedText>}
                        </ThemedText>
                    </View>
                    <View style={{gap: 4}}>
                        <ThemedText type="label">{t("resetPassword.newPassword")}</ThemedText>
                        <TextInput
                            aria-label='New Password input field'
                            placeholder={t('resetPassword.newPassword')}
                            placeholderTextColor={"#8b8b8bff"}
                            style={globalStyles.input}
                            onChangeText={(newPassword) => {
                                inputRef.current.newPassword = newPassword;
                            }}
                            autoCapitalize="none"
                            secureTextEntry={!showPassword}
                        />
                        <Pressable style={globalStyles.showPasswordIcon} onPress={handleShowPassword}>                         
                            <Ionicons name={showPassword ? "eye-off-outline" : "eye"} size={24} color="black"/>
                        </Pressable>
                    </View>
                    <View style={{gap: 4}}>
                        <ThemedText type="label">{t('resetPassword.confirmPassword')}</ThemedText>
                        <TextInput
                            aria-label='Confirm New Password input field'
                            placeholder={t('resetPassword.confirmPassword')}
                            placeholderTextColor={"#8b8b8bff"}
                            style={globalStyles.input}
                            onChangeText={(confirmNewPassword) => {
                                inputRef.current.confirmNewPassword = confirmNewPassword;
                            }}
                            autoCapitalize="none"
                            secureTextEntry={!showPassword}
                        />
                        </View>
                    <Pressable onPress={handleResetPassword}>
                        <ThemedText>{t('resetPassword.button')}</ThemedText>
                    </Pressable>
                </View>
            </Wrapper>
        </SafeAreaView>
    )
}