import { useState, useRef } from 'react';
import { useRequestPasswordReset } from '@/lib/api/user/userMutations';
import { Wrapper } from '@/components/shared/Wrapper';
import { Container } from '@/components/shared/Container';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalStyles } from '@/styles/globalStyles';
import { ThemedText } from '@/components/ThemedText';
import { Pressable, TextInput, View } from 'react-native';

export default function ForgottenPassword() {
    const { requestPasswordReset, error } = useRequestPasswordReset();
    const globalStyles = useGlobalStyles();
    const [ success, setSuccess ] = useState(false);
    const [ successMessage, setSuccessMessage ] = useState('');
    const emailRef = useRef({email: ""});

    const handleRequestPasswordReset = async () => {
        const { email } = emailRef.current;
        if (!email) {
            setSuccessMessage("Please enter an e-mail address.");
            return;
        }
        const data = await requestPasswordReset(email);
        if (data) {
            setSuccess(true);
            setSuccessMessage("Password reset request was successful. Please check yor e-mail and follow the instructions.");
        }
    }
    
    return (
        <SafeAreaView>
            <Wrapper>
                <View style={[globalStyles.container, { }]}>
                    <ThemedText type="title">Request Password Reset</ThemedText>
                    <TextInput
                        aria-label='Email input field'
                        placeholder="E-mail"
                        placeholderTextColor={"#8b8b8bff"}
                        style={globalStyles.input}
                        onChangeText={(email) => {
                            emailRef.current.email = email;
                        }}
                        autoCapitalize="none"
                    />
                    <Pressable onPress={handleRequestPasswordReset}>
                        <ThemedText>Send Reset Email</ThemedText>
                    </Pressable>
                    {error && <ThemedText>{error.message}</ThemedText>}
                    {success && <ThemedText>{successMessage}</ThemedText>}
                    {!success && <ThemedText type="error">{successMessage}</ThemedText>}
                </View>
            </Wrapper>
        </SafeAreaView>
    )
}