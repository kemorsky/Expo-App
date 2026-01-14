import { useState, useRef } from 'react';
import { ThemedText } from "@/components/ThemedText";
import { Wrapper } from '@/components/shared/Wrapper';
import { View, TextInput, KeyboardAvoidingView, Platform, Text, Pressable } from "react-native";
import { useGlobalStyles } from '@/styles/globalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserInput } from '@/__generated__/graphql';
import { useSignIn } from '@/lib/api/user/userMutations';
import { useRouter } from 'expo-router';

export default function SignIn() {
    const { createUser, error } = useSignIn();
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
                    <View style={[globalStyles.container, { }]}>
                        <ThemedText type="title">Sign Up</ThemedText>
                        <View style={{height: 46}}>
                            {error && <ThemedText type="error">{error.message}</ThemedText>}
                            <ThemedText>
                                {uiError && <ThemedText type="error">{uiError}</ThemedText>}
                            </ThemedText>
                        </View>
                        <TextInput
                            aria-label='Username sign up input field'
                            placeholder="Username"
                            placeholderTextColor={"#8b8b8bff"}
                            style={globalStyles.input}
                            onChangeText={(name) => {
                                formRef.current.name = name;
                            }}
                            autoCapitalize="none"
                        />
                        <TextInput 
                            aria-label='Email sign up input field'
                            placeholder="Email"
                            placeholderTextColor={"#8b8b8bff"}
                            style={globalStyles.input}
                            onChangeText={(email) => {
                                formRef.current.email = email;
                            }}
                            autoCapitalize="none"
                        />
                        <TextInput 
                            aria-label='Password sign up input field'
                            placeholder="Password"
                            placeholderTextColor={"#8b8b8bff"}
                            style={globalStyles.input}
                            onChangeText={(password) => {
                                formRef.current.password = password;
                            }}
                            secureTextEntry
                        />
                        <TextInput 
                            aria-label='Confirm sign up input field'
                            placeholder="Confirm Password"
                            placeholderTextColor={"#8b8b8bff"}
                            style={globalStyles.input}
                            onChangeText={(confirmPassword) => {
                                formRef.current.confirmPassword = confirmPassword;
                            }}
                            secureTextEntry
                        />
                        <Pressable style={globalStyles.buttonSignUp} onPress={() => handleSignIn()}>
                            <ThemedText type="buttonText" style={{fontSize: 16}}>Sign Up</ThemedText>
                        </Pressable>
                    </View>
                </Wrapper>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}