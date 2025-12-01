import { ScrollView, StyleSheet, View} from "react-native"
import { useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { Easing, FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

type WrapperProps = {
    children: React.ReactNode
};

// SafeAreaView adds vertical padding which makes the app look weird on mobile. Consider using View instead or tweak SafeAreaView

export const Wrapper = ({ children }: WrapperProps) => {
    const opacity = useSharedValue(0);

    useFocusEffect(
        useCallback(() => {
            opacity.value = 0.75;
            opacity.value = withTiming(1, { duration: 300,});

            return () => {
                opacity.value = withTiming(0.75, { duration: 300 })
            };
        }, [opacity])
    );

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <Animated.View style={[styles.wrapper, animatedStyle]}>
            <ScrollView showsVerticalScrollIndicator={false}> 
                {children}
            </ScrollView>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        minHeight: 752,
        backgroundColor: '#c5c5c5',
        paddingBottom: 80
    },
})