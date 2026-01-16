import { useAuth } from '@/utils/AuthContext';
import { useRef } from 'react';
import { Wrapper } from '@/components/shared/Wrapper';
import { View, KeyboardAvoidingView, Platform, TextInput, Pressable } from "react-native";
import { ThemedText } from '@/components/ThemedText';
import { useGlobalStyles } from "@/styles/globalStyles";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

import { UserLogin } from "@/__generated__/graphql";
import { useTranslation } from 'react-i18next';

export default function Login() {
    const { logIn, authErrors } = useAuth();
    const { t } = useTranslation();
    const globalStyles = useGlobalStyles();
    const formRef = useRef<UserLogin>({
        email: '',
        password: ''
    })

    return (
        <SafeAreaView>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : "height"}>
                <Wrapper>
                    <View style={[globalStyles.container, {marginTop: 30, }]}>
                        <ThemedText type="title">{t('login.welcome')}</ThemedText>
                        <ThemedText type="title">{t('login.proceed')}</ThemedText>
                        <View style={{height: 24}}>
                            {authErrors.map(err => (
                                <ThemedText key={err.message} type="error">{err.message}</ThemedText>
                            ))}
                        </View>
                        <View style={[globalStyles.container, {padding: 0, marginBottom: 20}]}>
                            <TextInput
                                aria-label='E-mail login input field'
                                placeholder={t('login.email')}
                                placeholderTextColor={"#8b8b8bff"}
                                style={globalStyles.input}
                                autoCapitalize="none"
                                selectTextOnFocus={false}
                                keyboardType='email-address'
                                onChangeText={(email) => {
                                    formRef.current.email = email
                                }}
                            />
                            <TextInput 
                                aria-label='Password login input field'
                                placeholder={t('login.password')}
                                placeholderTextColor={"#8b8b8bff"}
                                style={globalStyles.input}
                                selectTextOnFocus={false}
                                onChangeText={(password) => {
                                    formRef.current.password = password
                                }}
                                secureTextEntry
                            />
                            <Link href="/ForgottenPassword" push asChild>
                                <Pressable style={{alignSelf: "flex-end"}} aria-label='Forgot Password button'>
                                    <ThemedText>{t('login.forgotPassword')}</ThemedText>
                                </Pressable>
                            </Link>
                        </View>
                        <Pressable aria-label='Sign In button' style={globalStyles.buttonLogin} onPress={() => logIn(formRef.current.email, formRef.current.password)}>
                            <ThemedText type="buttonText" style={{fontSize: 16}}>{t('login.button')}</ThemedText>
                        </Pressable>
                        <View style={{flexDirection: "column", alignItems: "center", gap: 12, marginTop: 16}}>
                            <ThemedText>{t('login.noAccount')}</ThemedText>
                            <Link href="/SignUp" push asChild>
                                <Pressable aria-label='Sign Up button'>
                                    <ThemedText type="buttonText" style={{fontSize: 16}}>{t('login.signUp')}</ThemedText>
                                </Pressable>
                            </Link>
                        </View>
                    </View>
                </Wrapper>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}