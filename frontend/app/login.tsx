import { useAuth } from '@/utils/AuthContext';
import { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, TextInput, Pressable, Text } from "react-native";
import { ThemedText } from '@/components/ThemedText';
import { useGlobalStyles } from "@/styles/globalStyles";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { UserLogin } from "@/__generated__/graphql";

export default function Login() {
    const { logIn } = useAuth();
    const [ user, setUser ] = useState<UserLogin>({email: '', password: ''})
    const router = useRouter();
    const globalStyles = useGlobalStyles();

    const handleEmailChange = (email: string) => setUser((prev) => ({ ...prev, email }));
    const handlePasswordChange = (password: string) => setUser((prev) => ({ ...prev, password }));

    return (
        <SafeAreaView>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : "height"}>
                <View style={globalStyles.container}>
                    <ThemedText type="title">Login</ThemedText>
                    <TextInput
                        placeholder="Email"
                        style={globalStyles.input}
                        value={user.email}
                        autoCapitalize="none"
                        keyboardType='email-address'
                        onChangeText={handleEmailChange}
                    />
                    <TextInput 
                        placeholder="Password"
                        style={globalStyles.input}
                        value={user.password}
                        onChangeText={handlePasswordChange}
                        secureTextEntry
                    />
                     <Pressable style={globalStyles.buttonLogin} onPress={() => logIn(user.email, user.password)}>
                            <Text style={globalStyles.buttonText}>Login</Text>
                        </Pressable>
                    <View>
                        <Text>Not a user yet?</Text>
                        <Pressable onPress={() => router.replace("/SignUp")}>
                            <Text style={globalStyles.buttonText}>Create an account</Text>
                        </Pressable>
                    </View>
                    
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}