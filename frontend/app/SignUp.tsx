import { useState } from 'react';
import { CombinedGraphQLErrors } from "@apollo/client";
import { ThemedText } from "@/components/ThemedText";
import { Wrapper } from '@/components/shared/Wrapper';
import { View, TextInput, KeyboardAvoidingView, Platform, Text, Pressable } from "react-native";
import { useGlobalStyles } from '@/styles/globalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserInput } from '@/__generated__/graphql';
import { useSignIn } from '@/lib/api/user/userMutations';
import { useRouter } from 'expo-router';
import { useGraphQLErrors} from '@/lib/graphql/errors';

export default function SignIn() {
    const { createUser, error } = useSignIn();
    const [ newUser, setNewUser ] = useState<UserInput>({email: '', name: '', password: '',});
    const [uiError, setUiError] = useState<string>('');
    const [ confirmPassword, setConfirmPassword ] = useState<string>('');
    const router = useRouter();
    const globalStyles = useGlobalStyles();
    const errors = useGraphQLErrors(error);

    if (errors.length > 0) {
        errors.forEach((err) => {
            console.log(err.message);
            console.log(err.code);
        });
    }

    const signIn = async (email: string, name: string, password: string) => {
        const data = await createUser(email, name, password);
        if (data) {
            setNewUser({
                email: data.email ?? '',
                name: data.name ?? '',
                password: data.password ?? ''
            })
            console.log("Signup successful" + newUser);
            router.replace("/home");
        }
    }

    const handleSignIn = async () => {
        if (newUser.password !== confirmPassword) {
            setUiError("Passwords must match");
            return;
        }
        await signIn(newUser.email, newUser.name, newUser.password);
    }

    return (
        <SafeAreaView>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : "height"}>
                <Wrapper>
                    <View style={[globalStyles.container, { }]}>
                        <ThemedText type="title">Sign Up</ThemedText>
                        {error && <ThemedText>{error.message}</ThemedText>}
                        <TextInput 
                            aria-label='Username sign up input field'
                            placeholder="Username"
                            placeholderTextColor={"#8b8b8bff"}
                            style={globalStyles.input}
                            value={newUser.name}
                            onChangeText={(name: string) => setNewUser((prev) => ({...prev, name}))}
                            autoCapitalize="none"
                        />
                        <TextInput 
                            aria-label='Email sign up input field'
                            placeholder="Email"
                            placeholderTextColor={"#8b8b8bff"}
                            style={globalStyles.input}
                            value={newUser.email}
                            onChangeText={(email: string) => setNewUser((prev) => ({...prev, email}))}
                            autoCapitalize="none"
                        />
                        <TextInput 
                            aria-label='Password sign up input field'
                            placeholder="Password"
                            placeholderTextColor={"#8b8b8bff"}
                            style={globalStyles.input}
                            value={newUser.password}
                            onChangeText={(password: string) => setNewUser((prev) => ({...prev, password}))}
                            secureTextEntry
                        />
                        <TextInput 
                            aria-label='Confirm sign up input field'
                            placeholder="Confirm Password"
                            placeholderTextColor={"#8b8b8bff"}
                            style={globalStyles.input}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                        />
                        <Pressable style={globalStyles.buttonSignUp} onPress={() => handleSignIn()}>
                            <Text style={globalStyles.buttonText}>Sign Up</Text>
                        </Pressable>
                    </View>
                </Wrapper>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}