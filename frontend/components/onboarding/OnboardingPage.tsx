import { useGlobalStyles } from "@/styles/globalStyles";
import { View, useWindowDimensions } from "react-native"
import { ThemedText } from "../shared/ThemedText";
import { OnboardingPageProps } from "@/utils/pagination"
import { useEffect } from "react";
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";

export default function OnboardingPage({ item }: OnboardingPageProps) {
    const { width } = useWindowDimensions();
    const globalStyles = useGlobalStyles();
    const opacity = useSharedValue(0);
    const scale = useSharedValue(0.9);
    
    useEffect(() => {
        opacity.value = withTiming(1, { duration: 500 });
        scale.value = withTiming(1, { duration: 500 });
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ scale: scale.value }],
    }));

    return (
        <View style={[{ width }, globalStyles.onboardingWrapper]}>
            <Animated.Image style={[ animatedStyle, { width: 341, height: 341 }, { resizeMode: "contain" } ]} source={item.image} />
            <ThemedText type="title" style={{ fontSize: 24, width: 351, textAlign: "left" }}>{item.title}</ThemedText>
            <ThemedText style={{ maxWidth: 351, textAlign: "left" }}>{item.description}</ThemedText>
        </View>
    )
}