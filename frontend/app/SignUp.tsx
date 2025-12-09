import { useState } from 'react';
import { ThemedText } from "@/components/ThemedText";
import { View, TextInput, KeyboardAvoidingView, Platform, Text, Pressable } from "react-native";
import { useGlobalStyles } from '@/styles/globalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserInput } from '@/__generated__/graphql';
import { useSignIn } from '@/lib/api/user/userMutations';
import { useRouter } from 'expo-router';

export default function SignIn() {
    const { createUser } = useSignIn();
    const [ newUser, setNewUser ] = useState<UserInput>({email: '', name: '', password: '',});
    const router = useRouter();
    const globalStyles = useGlobalStyles();

    const signIn = async (email: string, name: string, password: string) => {
        try {
            const data = await createUser(email, name, password);
            if (data) {
                setNewUser({
                    email: data.email ?? '',
                    name: data.name ?? '',
                    password: data.password ?? ''
                })
                console.log("Signup successful" + newUser);
                router.replace("/home");
            } else {
                console.error("Signup failed: no data returned");
            }
        } catch (error) {
            throw new Error (`Signup failed: ${error}`);
        }
    }

    return (
        <SafeAreaView>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : "height"}>
                <View style={globalStyles.container}>
                    <TextInput 
                        placeholder="Email"
                        style={globalStyles.input}
                        value={newUser.email}
                        onChangeText={(email: string) => setNewUser((prev) => ({...prev, email}))}
                        autoCapitalize="none"
                    />
                    <TextInput 
                        placeholder="Username"
                        style={globalStyles.input}
                        value={newUser.name}
                        onChangeText={(name: string) => setNewUser((prev) => ({...prev, name}))}
                        autoCapitalize="none"
                    />
                    <TextInput 
                        placeholder="Password"
                        style={globalStyles.input}
                        value={newUser.password}
                        onChangeText={(password: string) => setNewUser((prev) => ({...prev, password}))}
                        secureTextEntry
                    />
                    {/* <TextInput 
                        placeholder="Confirm Password"
                        style={globalStyles.input}
                        value={newUser.password}
                        onChangeText={(password: string) => setNewUser((prev) => ({...prev, password}))}
                        secureTextEntry
                    /> */}
                    <Pressable style={globalStyles.buttonSignUp} onPress={() => signIn(newUser.email, newUser.name, newUser.password)}>
                        <Text style={globalStyles.buttonText}>Sign Up</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}