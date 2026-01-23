import { useAuth } from "@/utils/AuthContext";
import { useState, useRef } from "react";
import { Wrapper } from "@/components/shared/Wrapper";
import { View, KeyboardAvoidingView, Platform, TextInput, Pressable } from "react-native";
import { ThemedText } from "@/components/shared/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useGlobalStyles } from "@/styles/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

import { UserLogin } from "@/__generated__/graphql";
import { useTranslation } from "react-i18next";

export default function Login() {
    const { logIn, authErrors } = useAuth();
    const [ showPassword, setShowPassword ] = useState(false);
    const { t } = useTranslation();
    const globalStyles = useGlobalStyles();

    const formRef = useRef<UserLogin>({
        email: "",
        password: ""
    })

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    };

    return (
        <SafeAreaView>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <Wrapper>
                    <View style={[globalStyles.container, {marginTop: 15 }]}>
                        <ThemedText type="title">{t("login.welcome")}</ThemedText>
                        <ThemedText type="title">{t("login.proceed")}</ThemedText>
                        <View style={[globalStyles.container, {padding: 0}]}>
                            <View style={{gap: 4}}>
                                <ThemedText type="label">{t("login.email")}</ThemedText>
                                <TextInput
                                    aria-label="E-mail login input field"
                                    placeholder={t("login.email")}
                                    placeholderTextColor={"#8b8b8bff"}
                                    style={globalStyles.input}
                                    autoCapitalize="none"
                                    selectTextOnFocus={false}
                                    keyboardType="email-address"
                                    onChangeText={(email) => {
                                        formRef.current.email = email
                                    }}
                                />
                            </View>
                            <View style={{gap: 4}}>
                                <ThemedText type="label">{t("login.password")}</ThemedText>
                                <TextInput                
                                    aria-label="Password login input field"
                                    placeholder={t("login.password")}
                                    placeholderTextColor={"#8b8b8bff"}
                                    style={[globalStyles.input, {flex: 1}]}
                                    selectTextOnFocus={false}
                                    onChangeText={(password) => {
                                        formRef.current.password = password
                                    }}
                                    autoCapitalize="none"
                                    secureTextEntry={!showPassword}
                                />
                                <Pressable style={globalStyles.showPasswordIcon} onPress={handleShowPassword}>                         
                                    <Ionicons name={showPassword ? "eye-off-outline" : "eye"} size={24} color="black"/>
                                </Pressable>
                            </View>
                            <Link href="/ForgottenPassword" push asChild>
                                <Pressable style={{alignSelf: "flex-end"}} aria-label="Forgot Password button">
                                    <ThemedText type="signInPageTexts">{t("login.forgotPassword")}</ThemedText>
                                </Pressable>
                            </Link>
                        </View>
                        <View style={{height: 22}}>
                            {authErrors.map(err => (
                                <ThemedText key={err.message} type="error" style={{alignSelf: "center"}}>{err.message}</ThemedText>
                            ))}
                        </View>
                        <Pressable aria-label="Sign In button" style={globalStyles.buttonSignIn} onPress={() => logIn(formRef.current.email, formRef.current.password)}>
                            <ThemedText type="buttonText" style={{fontSize: 16}}>{t("login.button")}</ThemedText>
                        </Pressable>
                        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 16}}>
                            <ThemedText>{t("login.noAccount")}</ThemedText>
                            <Link href="/SignUp" push asChild>
                                <Pressable aria-label="Sign Up button">
                                    <ThemedText type="signInPageTexts">{t("login.signUp")}</ThemedText>
                                </Pressable>
                            </Link>
                        </View>
                    </View>
                </Wrapper>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}