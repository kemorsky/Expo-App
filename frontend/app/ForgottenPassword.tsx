import { useState, useRef } from "react";
import { useRequestPasswordReset } from "@/api/user/userMutations";
import { Wrapper } from "@/components/shared/Wrapper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalStyles } from "@/styles/globalStyles";
import { ThemedText } from "@/components/shared/ThemedText";
import { Pressable, TextInput, View } from "react-native";
import { useTranslation } from "react-i18next";

export default function ForgottenPassword() {
    const { requestPasswordReset, error } = useRequestPasswordReset();
    const { t } = useTranslation();
    const globalStyles = useGlobalStyles();
    const [ success, setSuccess ] = useState(false);
    const [ successMessage, setSuccessMessage ] = useState("");
    const emailRef = useRef({email: ""});

    const handleRequestPasswordReset = async () => {
        const { email } = emailRef.current;
        if (!email) {
            setSuccessMessage(t("forgotPassword.noInput"));
            return;
        }
        const data = await requestPasswordReset(email);
        if (data) {
            setSuccess(true);
            setSuccessMessage(t("forgotPassword.successMessage"));
        }
    }
    
    return (
        <SafeAreaView>
            <Wrapper>
                <View style={[globalStyles.container, { }]}>
                    <ThemedText type="title">{t("forgotPassword.title")}</ThemedText>
                    <TextInput
                        aria-label="Email input field"
                        placeholder={t("forgotPassword.email")}
                        placeholderTextColor={"#8b8b8bff"}
                        style={globalStyles.input}
                        onChangeText={(email) => {
                            emailRef.current.email = email;
                        }}
                        autoCapitalize="none"
                    />
                    <Pressable onPress={handleRequestPasswordReset}>
                        <ThemedText>{t("forgotPassword.sendEmailButton")}</ThemedText>
                    </Pressable>
                    {error && <ThemedText>{error.message}</ThemedText>}
                    {success && <ThemedText>{successMessage}</ThemedText>}
                    {!success && <ThemedText type="error">{successMessage}</ThemedText>}
                </View>
            </Wrapper>
        </SafeAreaView>
    )
}