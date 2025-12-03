import { ScrollView, StyleSheet } from "react-native"
import { useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

type WrapperProps = {
    children: React.ReactNode
};

export const Wrapper = ({ children }: WrapperProps) => {
    const opacity = useSharedValue(0);

    useFocusEffect(
        useCallback(() => {
            opacity.value = 0.9;
            opacity.value = withTiming(1, { duration: 300,});

            return () => {
                opacity.value = withTiming(0.9, { duration: 300 })
            };
        }, [opacity])
    );

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <Animated.View style={[styles.wrapper, animatedStyle]}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}> 
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
    content: {
        flexDirection: 'column',
        backgroundColor: '#c5c5c5',
        gap: 8,
    }
})