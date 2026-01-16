import { useState, useRef } from 'react';
import { ThemedText } from "@/components/ThemedText";
import { Wrapper } from '@/components/shared/Wrapper';
import { Container } from '@/components/shared/Container';
import { View, TextInput, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import { useGlobalStyles } from '@/styles/globalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserInput } from '@/__generated__/graphql';
import { useSignIn } from '@/lib/api/user/userMutations';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function SignIn() {
    const { createUser, error } = useSignIn();
    const { t } = useTranslation();
    const [uiError, setUiError] = useState("");
    const router = useRouter();
    const globalStyles = useGlobalStyles();
    const formRef = useRef<UserInput & { confirmPassword: string }>({
        email: '', 
        name: '', 
        password: '',
        confirmPassword: ''
    });

    const handleSignIn = async () => {
        const { email, name, password, confirmPassword } = formRef.current;

        if (password !== confirmPassword) {
            setUiError("Passwords must match");
            return;
        }

        const data = await createUser(email, name, password);

        if (data) {
            router.replace("/SignIn");
        }
    }

    return (
        <SafeAreaView>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : "height"}>
                <Wrapper>
                    <Container>
                        <View style={{gap: 4}}>
                            <ThemedText type="label">{t('signUp.name')}</ThemedText>
                            <TextInput
                                aria-label='Username sign up input field'
                                placeholder={t('signUp.name')}
                                placeholderTextColor={"#8b8b8bff"}
                                style={globalStyles.input}
                                onChangeText={(name) => {
                                    formRef.current.name = name;
                                }}
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={{gap: 4}}>
                            <ThemedText type="label">{t('signUp.email')}</ThemedText>
                            <TextInput 
                                aria-label='Email sign up input field'
                                placeholder={t('signUp.email')}
                                placeholderTextColor={"#8b8b8bff"}
                                style={globalStyles.input}
                                onChangeText={(email) => {
                                    formRef.current.email = email;
                                }}
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={{gap: 4}}>
                            <ThemedText type="label">{t('signUp.password')}</ThemedText>
                            <TextInput 
                                aria-label='Password sign up input field'
                                placeholder={t('signUp.password')}
                                placeholderTextColor={"#8b8b8bff"}
                                style={globalStyles.input}
                                onChangeText={(password) => {
                                    formRef.current.password = password;
                                }}
                                secureTextEntry
                            />
                        </View>
                        <View style={{gap: 4}}>
                            <ThemedText type="label">{t('signUp.confirmPassword')}</ThemedText>
                            <TextInput 
                                aria-label='Confirm sign up input field'
                                placeholder={t('signUp.confirmPassword')}
                                placeholderTextColor={"#8b8b8bff"}
                                style={globalStyles.input}
                                onChangeText={(confirmPassword) => {
                                    formRef.current.confirmPassword = confirmPassword;
                                }}
                                secureTextEntry
                            />
                        </View>
                        <Pressable style={[globalStyles.buttonSignUp, {marginTop: 20}]} onPress={() => handleSignIn()}>
                            <ThemedText type="buttonText" style={{fontSize: 16}}>{t('signUp.button')}</ThemedText>
                        </Pressable>
                        <View style={{height: 42}}>
                            {error && <ThemedText type="error">{error.message}</ThemedText>}
                            <ThemedText>
                                {uiError && <ThemedText type="error">{uiError}</ThemedText>}
                            </ThemedText>
                        </View>
                    </Container>
                </Wrapper>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}