import { StyleSheet, Text, View, Pressable } from 'react-native';
import { usePreviewChallenge, useAcceptChallenge } from '@/lib/api/challenges/challengesMutations';
import { useGlobalStyles } from '@/styles/globalStyles';
import { formatDate } from '@/utils/formatDate';
import { Wrapper } from '@/components/shared/Wrapper';
import { ThemedText } from '@/components/ThemedText';
import { Container } from '@/components/shared/Container';
import React, { useState, useEffect } from 'react';
import { UserChallenge } from '@/__generated__/graphql';
import { router } from 'expo-router';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

export default function AcceptChallenge() {
    const { acceptChallenge } = useAcceptChallenge();
    const { previewChallenge } = usePreviewChallenge();
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

        translateY.value = withTiming(0, { duration: 300 });
        opacity.value = withTiming(1, { duration: 300 });
    }, [translateY, opacity, previewedChallenge]);
    
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        opacity: opacity.value,
    }));

    const handlePreviewChallenge = async () => {
            const data = await previewChallenge();
            if (data) {
                setPreviewedChallenge(data)
            }
        }

    const handleAcceptChallenge = async (id: string) => {
        try {
            const data = await acceptChallenge(id);
            if (data) {
                router.replace('/home');
            };
        } catch (error: any) {
            throw new Error (`Error assigning random challenge: ${error}`)
        }
    };

    return (
        <Wrapper>
            <Container>
                <ThemedText type='date'>{formatDate(new Date().toString())}</ThemedText>
                <View style={styles.challengeWrapper}>
                    <View style={styles.challengeContainer}>
                        <View>
                            <Animated.Text style={[animatedStyle, {textAlign: "center" }]}>
                                <ThemedText style={{ fontSize: 18}} type='subtitle'>
                                    {previewedChallenge?.challenge?.title}
                                </ThemedText>
                            </Animated.Text>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <Pressable style={[globalStyles.buttonMarkAsDone, {backgroundColor: "red", width: 120, alignItems: "center"}]} onPress={() => handlePreviewChallenge()}>
                                <Text>Not today</Text>
                            </Pressable>
                            <Pressable style={[globalStyles.buttonMarkAsDone, {backgroundColor: "green", width: 120, alignItems: "center"}]} onPress={() => handleAcceptChallenge(previewedChallenge?.id ?? '')}>
                                <Text>Accept</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Container>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
     challengeWrapper: {
        width: '100%', 
        height: 650, 
        flexDirection: 'column', 
        gap: 28, 
        justifyContent: "center", 
        alignItems: "center"
    },
    challengeContainer: {
        width: '100%', 
        height: 200, 
        flexDirection: 'column', 
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