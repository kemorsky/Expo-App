import { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate, Extrapolation, useAnimatedProps } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export type BottomSheetController = {
    open: () => void;
    close: () => void;
    snapTo: (index: number) => void;
};

type BottomSheetProps = {
    snapPoints: number[];
    controller?: (ctrl: BottomSheetController) => void;
    initialIndex?: number;
    children: React.ReactNode,
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const BottomSheet = ({ snapPoints, controller, initialIndex = 0, children }: BottomSheetProps) => {
    const translateY = useSharedValue(SCREEN_HEIGHT);
    const context = useSharedValue({ y: 0 });
    const isSheetActive = useSharedValue(false);

    const openTo = snapPoints[initialIndex] ?? snapPoints[0];
    const closed = SCREEN_HEIGHT;

    useEffect(() => {
        if (!controller) return;

        const api: BottomSheetController = {
            open: () => {
                isSheetActive.value = true; 
                translateY.value = withTiming(openTo, { duration: 300 });
            },
            close: () => {
                isSheetActive.value = false;
                translateY.value = withTiming(closed, { duration: 300 });
            },
            snapTo: (i: number) => {
                const point = snapPoints[i];
                if (typeof point === "number") {
                    translateY.value = withTiming(point, { duration: 300 });
                }
            }
        };

        controller(api);
    }, [controller, isSheetActive, openTo, closed, snapPoints, translateY]);

    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value };
        })
        .onUpdate((evt) => {
            const next = context.value.y + evt.translationY;

            const minSnap = Math.min(...snapPoints);

            translateY.value = Math.min(
                closed,
                Math.max(next, minSnap)
            );
        })
        .onEnd(() => {
            const current = translateY.value;

            // finds nearest snap point
            const nearest = snapPoints.reduce((prev, curr) => {
                return Math.abs(curr - current) < Math.abs(prev - current)
                    ? curr
                    : prev;
            }, snapPoints[0]);

            // if too low, close instead of snapping
            const closeThreshold = (closed + nearest) / 2;
            if (current > closeThreshold) {
                isSheetActive.value = false;
                translateY.value = withTiming(closed, { duration: 300 });
            } else {
                isSheetActive.value = true;
                translateY.value = withTiming(nearest, { duration: 300 });
            }
        });

    const animatedStyle = useAnimatedStyle(() => {
        const lowest = Math.min(...snapPoints);
        const borderRadius = interpolate(
            translateY.value,
            [lowest, closed],
            [25, 5],
            Extrapolation.CLAMP
        );

        return {
            transform: [{ translateY: translateY.value }],
            borderRadius,
            display: translateY.value === closed ? 'none' : 'flex', // <-- hides it completely
        };
    });

    const animatedBackdropStyle = useAnimatedStyle(() => ({
        opacity: withTiming(isSheetActive?.value ? 1 : 0, { duration: 300 }),
    }));

    return (
        <> 
            {/* BackDrop */} {/* pointerEvents set directly inside the element prevent scrolling of the background page */}
            <Animated.View pointerEvents={isSheetActive.value ? "auto" : "none"} style={[styles.backdrop, animatedBackdropStyle]} />
            {/* BottomSheet */}
            <GestureDetector gesture={gesture}>
                <Animated.View style={[styles.bottomSheet, animatedStyle]}>
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
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 90,
    },
    bottomSheet: {
        height: SCREEN_HEIGHT,
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: '#854141ff',
        zIndex: 100
    },
    content: {
        padding: 12,
        width: '100%',
        backgroundColor: '#862e2eff',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
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