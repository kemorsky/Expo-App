import { StyleSheet, View, Pressable } from "react-native";
import { usePreviewChallenge, useAcceptChallenge } from "@/api/challenges/challengesMutations";
import { useGlobalStyles } from "@/styles/globalStyles";
import { formatDate } from "@/utils/formatDate";
import { Wrapper } from "@/components/shared/Wrapper";
import { ThemedText } from "@/components/shared/ThemedText";
import { Container } from "@/components/shared/Container";
import React, { useState, useEffect } from "react";
import { UserChallenge } from "@/__generated__/graphql";
import { Link, router } from "expo-router";
import Animated, { useSharedValue, withTiming, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { useTranslation } from "react-i18next";

export default function AcceptChallenge() {
    const { t } = useTranslation();
    const { acceptChallenge, error: acceptChallengeError } = useAcceptChallenge();
    const { previewChallenge, error } = usePreviewChallenge();
    const [ previewedChallenge, setPreviewedChallenge ] = useState<Partial<UserChallenge | null>>(null);

    const globalStyles = useGlobalStyles();
        
    const translateY = useSharedValue(-20);
    const opacity = useSharedValue(0);

    useEffect(() => {
        handlePreviewChallenge()
    }, [])

    useEffect(() => {
        if (!previewedChallenge) return;

        translateY.value = -20; // reset values to let animations play on each roll
        opacity.value = 0;

        translateY.value = withSpring(0, { duration: 400 });
        opacity.value = withTiming(1, { duration: 400 });
    }, [translateY, opacity, previewedChallenge]);
    
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        opacity: opacity.value,
    }));

    const handlePreviewChallenge = async () => {
        const data = await previewChallenge();
        if (!data) {
            throw error;
        }
        setPreviewedChallenge(data)
    }

    const handleAcceptChallenge = async (id: string) => {
        const data = await acceptChallenge(id);
        if (!data) {
            throw error;
        };
        router.dismissTo("/home");  
    };

    return (
        <Wrapper>
            <Container>
                <ThemedText type="date">{formatDate(new Date().toString())}</ThemedText>
                <View style={styles.challengeWrapper}>
                    {error || acceptChallengeError ? (
                        <View style={styles.challengeContainer}>
                            <View>
                                {error && <ThemedText style={{fontSize: 16}} type="error">{error.message}.</ThemedText>}
                                {acceptChallengeError && <ThemedText style={{fontSize: 16}} type="error">{acceptChallengeError.message}.</ThemedText>}
                            </View>
                            <View style={styles.buttonsContainer}>
                                <Link dismissTo href="/home">
                                    <Pressable aria-label="Go back to homepage button" 
                                               style={[globalStyles.buttonAction,
                                               {backgroundColor: "none", borderWidth: 1, borderColor: "#375375", width: 120, alignItems: "center",}]} 
                                               onPress={() => handlePreviewChallenge()}>
                                        <ThemedText>Go back</ThemedText>
                                    </Pressable>
                                </Link>
                            </View>
                        </View>) : (
                        <View style={styles.challengeContainer}>
                            <View>
                                <Animated.Text style={[animatedStyle, {textAlign: "center" }]}>
                                    <ThemedText style={{ fontSize: 18}} type="subtitle">
                                        {previewedChallenge?.challenge?.title}
                                    </ThemedText>
                                </Animated.Text>
                            </View>
                            <View style={styles.buttonsContainer}>
                                <Pressable aria-label="Roll a different challenge button" 
                                           style={({pressed}) => [{ opacity: pressed ? 0.7 : 1 }, 
                                           globalStyles.notTodayButton]} 
                                           onPress={() => handlePreviewChallenge()}>
                                    <ThemedText>{t("tabs.challenges.acceptChallenge.notTodayButton")}</ThemedText>
                                </Pressable>
                                <Pressable aria-label="Accept challenge button" 
                                           style={({pressed}) => [{ opacity: pressed ? 0.8 : 1 },
                                           globalStyles.acceptButton, { width: 120 }]} 
                                           onPress={() => handleAcceptChallenge(previewedChallenge?.id ?? "")}>
                                    <ThemedText type="buttonText">{t("tabs.challenges.acceptChallenge.acceptButton")}</ThemedText>
                                </Pressable>
                            </View>
                        </View>
                    )}
                </View>
            </Container>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
     challengeWrapper: {
        width: "100%", 
        height: 650, 
        flexDirection: "column", 
        gap: 28, 
        justifyContent: "center", 
        alignItems: "center"
    },
    challengeContainer: {
        width: "100%", 
        height: 200, 
        flexDirection: "column", 
        gap: 28, 
        justifyContent: "space-between", 
        alignItems: "center"
    },
    buttonsContainer: {
        width: 270,
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "space-between",
    },
})