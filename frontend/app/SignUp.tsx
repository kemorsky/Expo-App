import { useState, useRef } from "react";
import { ThemedText } from "@/components/shared/ThemedText";
import { Wrapper } from "@/components/shared/Wrapper";
import { Container } from "@/components/shared/Container";
import { View, TextInput, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useGlobalStyles } from "@/styles/globalStyles";
import { UserInput } from "@/__generated__/graphql";
import { useSignIn } from "@/api/user/userMutations";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

export default function SignIn() {
    const { createUser, error } = useSignIn();
    const { t } = useTranslation();
    const [ showPassword, setShowPassword ] = useState(false);
    const router = useRouter();
    const globalStyles = useGlobalStyles();
    const formRef = useRef<UserInput>({
        email: "", 
        name: "", 
        password: ""
    });

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleSignIn = async () => {
        const { email, name, password } = formRef.current;

        const data = await createUser(email, name, password);

        if (!data) {
            return;
        }

        router.navigate("/SignIn");
        
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <Wrapper>
                <Container>
                    <View style={{gap: 4}}>
                        <ThemedText type="label">{t("signUp.name")}</ThemedText>
                        <TextInput
                            aria-label="Username sign up input field"
                            placeholder={t("signUp.name")}
                            placeholderTextColor={"#8b8b8bff"}
                            style={globalStyles.input}
                            onChangeText={(name) => {
                                formRef.current.name = name;
                            }}
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={{gap: 4}}>
                        <ThemedText type="label">{t("signUp.email")}</ThemedText>
                        <TextInput 
                            aria-label="Email sign up input field"
                            placeholder={t("signUp.email")}
                            keyboardType="email-address"
                            placeholderTextColor={"#8b8b8bff"}
                            style={globalStyles.input}
                            onChangeText={(email) => {
                                formRef.current.email = email;
                            }}
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={{gap: 4}}>
                        <ThemedText type="label">{t("signUp.password")}</ThemedText>
                        <TextInput 
                            aria-label="Password sign up input field"
                            placeholder={t("signUp.password")}
                            placeholderTextColor={"#8b8b8bff"}
                            style={globalStyles.input}
                            onChangeText={(password) => {
                                formRef.current.password = password;
                            }}
                            autoCapitalize="none"
                            secureTextEntry={!showPassword}
                        />
                        <Pressable style={globalStyles.showPasswordIcon} onPress={handleShowPassword}>
                            <Ionicons name={showPassword ? "eye-off-outline" : "eye"} size={24} color="black"/>
                        </Pressable>
                    </View>
                    <View style={{height: 44}}>
                        {error && <ThemedText type="error" style={{alignSelf: "center"}}>{error.message}</ThemedText>}
                    </View>
                    <Pressable style={globalStyles.buttonSignIn} onPress={() => handleSignIn()}>
                        <ThemedText type="buttonText" style={{ fontSize: 16 }}>{t("signUp.button")}</ThemedText>
                    </Pressable>
                    
                </Container>
            </Wrapper>
        </KeyboardAvoidingView>
    )
}