import { useAuth } from '@/utils/AuthContext';
import { useState } from 'react';
import { Wrapper } from '@/components/shared/Wrapper';
import { View, KeyboardAvoidingView, Platform, TextInput, Pressable, Text } from "react-native";
import { ThemedText } from '@/components/ThemedText';
import { useGlobalStyles } from "@/styles/globalStyles";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

import { UserLogin } from "@/__generated__/graphql";

export default function Login() {
    const { logIn } = useAuth();
    const [ user, setUser ] = useState<UserLogin>({email: '', password: ''})
    const globalStyles = useGlobalStyles();

    const handleEmailChange = (email: string) => setUser((prev) => ({ ...prev, email }));
    const handlePasswordChange = (password: string) => setUser((prev) => ({ ...prev, password }));

    return (
        <SafeAreaView>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : "height"}>
                <Wrapper>
                    <View style={[globalStyles.container, {marginTop: 80, }]}>
                        <ThemedText type="title">Welcome back!</ThemedText>
                        <ThemedText type="title">Sign in to proceed to your account</ThemedText>
                        <View style={[globalStyles.container, {padding: 0, marginBottom: 20}]}>
                            <TextInput
                                aria-label='E-mail login input field'
                                placeholder="Email"
                                placeholderTextColor={"#8b8b8bff"}
                                style={globalStyles.input}
                                value={user.email}
                                autoCapitalize="none"
                                keyboardType='email-address'
                                onChangeText={handleEmailChange}
                            />
                            <TextInput 
                                aria-label='Password login input field'
                                placeholder="Password"
                                placeholderTextColor={"#8b8b8bff"}
                                style={globalStyles.input}
                                value={user.password}
                                onChangeText={handlePasswordChange}
                                secureTextEntry
                            />
                        </View>
                        <Pressable aria-label='Sign In button' style={globalStyles.buttonLogin} onPress={() => logIn(user.email, user.password)}>
                            <Text style={globalStyles.buttonText}>Login</Text>
                        </Pressable>
                        <View style={{flexDirection: "column", alignItems: "center", gap: 12, marginTop: 16}}>
                            <ThemedText>Not a user yet?</ThemedText>
                            <Link href="/SignUp" push asChild>
                                <Pressable aria-label='Sign Up button'>
                                    <Text style={globalStyles.buttonText}>Create an account</Text>
                                </Pressable>
                            </Link>
                        </View>
                        
                    </View>
                </Wrapper>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}