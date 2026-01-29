import { StyleSheet, View, Pressable, ActivityIndicator, TextInput } from "react-native";
import { Wrapper } from "@/components/shared/Wrapper";
import { Container } from "@/components/shared/Container";
import { ThemedText } from "@/components/shared/ThemedText";
import { useCreateChallenge } from "@/api/challenges/challengesMutations";
import { useMe } from "@/api/user/userQueries";
import { useRef } from "react";
import { useGlobalStyles } from "@/styles/globalStyles";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

export default function CreateChallenge() {
    const { user, loading, error } = useMe();
    const { createChallenge, error: createChallengeError } = useCreateChallenge();
    const { t } = useTranslation();
    const globalStyles = useGlobalStyles();
    const router = useRouter();
    const titleRef = useRef({title: ""});

    if (!user || loading) return <ActivityIndicator />;

    const handleCreateChallenge = async () => {
        const { title } = titleRef.current;
        const data = await createChallenge(title);
        if (!data) {
            throw error;
        }
        router.dismissTo("/challenges");
    }
    
    return (
        <Wrapper>
            <Container>
                <View style={styles.container}>
                    <ThemedText style={{ maxWidth: 250 }} type="subtitle">{t("tabs.challenges.createChallenge.header")}</ThemedText>
                    <View style={styles.content}>
                        <TextInput 
                            aria-label="Create Challenge Input Field"
                            placeholder={t("tabs.challenges.createChallenge.title")}
                            placeholderTextColor={"#8b8b8bff"}
                            style={globalStyles.input}
                            onChangeText={(title) => {
                                titleRef.current.title = title;
                            }}
                            autoCapitalize="sentences"
                            selectTextOnFocus={false}
                        />
                        <Pressable style={({pressed}) => [{ opacity: pressed ? 0.7 : 1 }, globalStyles.buttonAction]} onPress={() => handleCreateChallenge()}>
                            <ThemedText type="buttonText">{t("tabs.challenges.createButton")}</ThemedText>
                        </Pressable>
                        {createChallengeError && <ThemedText type="error">{createChallengeError.message}</ThemedText>}
                        {error && <ThemedText type="error">{error.message}</ThemedText>}
                    </View>
                </View>
            </Container>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 40,
    },
    content: {
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: 20,
        width: "100%",
    },
    button: {
        backgroundColor: "yellow",
        padding: 16,
        borderRadius: 8,
        alignSelf: "flex-end",
        
    }
})