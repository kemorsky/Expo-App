import { useEffect } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate, Extrapolation } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useThemeConfig } from "@/hooks/useThemeConfig";

export type BottomSheetController = {
    open: () => void;
    close: () => void;
};

type BottomSheetProps = {
    controller: (ctrl: BottomSheetController) => void;
    children: React.ReactNode,
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export const BottomSheet = ({ controller, children }: BottomSheetProps) => {
    const { theme } = useThemeConfig();

    const translateY = useSharedValue(SCREEN_HEIGHT);
    const context = useSharedValue({ y: 0 });
    const isSheetActive = useSharedValue(false);
    const headerHeight = useHeaderHeight();
    const bgColor = useSharedValue(theme.colors.card);

    const openTo = useSharedValue(headerHeight + 180);
    const closed = useSharedValue(SCREEN_HEIGHT);

    useEffect(() => {
        if (!controller) return;

        const api: BottomSheetController = {
            open: () => {
                isSheetActive.value = true; 
                translateY.value = withTiming(openTo.value, { duration: 300 });
            },
            close: () => {
                isSheetActive.value = false;
                translateY.value = withTiming(closed.value, { duration: 300 });
            }
        };

        controller(api);
    }, [controller, isSheetActive, openTo, closed, translateY]);

    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value };
        })
        .onUpdate((evt) => {
            const next = context.value.y + evt.translationY;

            translateY.value = Math.min(
                closed.value,
                Math.max(next, openTo.value)
            );
        })
        .onEnd(() => {
            const current = translateY.value;

            // if too low, close instead of snapping
            const closeThreshold = (closed.value + openTo.value) / 2;
            if (current > closeThreshold) {
                isSheetActive.value = false;
                translateY.value = withTiming(closed.value, { duration: 300 });
            } else {
                isSheetActive.value = true;
                translateY.value = withTiming(openTo.value, { duration: 300 });
            }
        });

    const animatedStyle = useAnimatedStyle(() => {
        const borderRadius = interpolate(
            translateY.value,
            [openTo.value, closed.value],
            [25, 5],
            Extrapolation.CLAMP
        );

        return {
            backgroundColor: bgColor.value,
            transform: [{ translateY: translateY.value }],
            borderRadius,
            opacity: translateY.value === closed.value ? 0 : 1, // <-- hides it completely, display: none caused issue with touch registration
        };
    }, [openTo.value, closed.value]);

    const animatedBackdropStyle = useAnimatedStyle(() => ({
        opacity: withTiming(isSheetActive?.value ? 1 : 0, { duration: 300 }),
    }));

    return (
        <> 
            {/* BackDrop - GestureDetector prevents scrolling of the background page */}
            <GestureDetector gesture={Gesture.Pan().onStart(() => {})}>
                <Animated.View style={[ styles.backdrop, animatedBackdropStyle ]} />
            </GestureDetector>
            {/* BottomSheet */}
            <GestureDetector gesture={gesture}>
                <Animated.View style={[ styles.bottomSheet, animatedStyle ]}>
                    <View style={styles.handle} />
                    <View style={styles.content}>
                        {children}
                    </View>
                </Animated.View>
            </GestureDetector>
        </>
    )
}

const styles = StyleSheet.create({
    backdrop: {
        // position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 90,
    },
    bottomSheet: {
        height: SCREEN_HEIGHT,
        position: "absolute",
        left: 0,
        right: 0,
        zIndex: 1000
    },
    content: {
        padding: 12,
        width: "100%",
        minHeight: 300,
        flexDirection: "column",
        alignItems: "flex-start",
    },
    handle: {
        alignSelf: "center",
        width: 40,
        height: 6,
        borderRadius: 3,
        marginVertical: 12,
        backgroundColor: "#888",
    },
})