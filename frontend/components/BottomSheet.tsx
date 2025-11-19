import { useState } from "react";
import { Dimensions, StyleSheet, View, Platform } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

type Props = {
    snapTo: string,
    children: React.ReactNode,
    toggleSheetRef?: (fn: () => void) => void;
}

export const BottomSheet = ({ snapTo, children, toggleSheetRef }: Props) => {
    const [ openSheet, setOpenSheet ] = useState(false);
    const screenHeight = Platform.OS === 'web' ? window.innerHeight : Dimensions.get('screen').height;

    const percentage = parseFloat(snapTo.replace('%', ''))  / 100;

    const openY = screenHeight * (1 - percentage);
    const closedY = screenHeight;

    const translateY = useSharedValue(openSheet ? openY : closedY)
    const startY = useSharedValue(0);

    const gesture = Gesture.Pan()
        .onStart(() => {
            startY.value = translateY.value;
        })
        .onUpdate((evt) => {
            const next = startY.value + evt.translationY;

            translateY.value = Math.min(Math.max(next, openY), closedY)
        })
        .onEnd(() => { // web development calls for use of withTiming over withSpring, might change later
            const mid = (openY + closedY) / 2;
            if (translateY.value < mid) {
                translateY.value = withTiming(openY, { duration: 300 });
                setOpenSheet(true);
            } else {
                translateY.value = withTiming(closedY, { duration: 300 });
                setOpenSheet(false);
            }
        })
    
    const toggleSheet = () => {
        if (translateY.value === closedY) {
            translateY.value = withTiming(openY, { duration: 300 });
            setOpenSheet(true);
        } else {
            translateY.value = withTiming(closedY, { duration: 300 });
            setOpenSheet(false);
        }
    };

    if (toggleSheetRef) toggleSheetRef(toggleSheet);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform:  [{translateY: translateY.value}]
        }    
    });

    return (
        <GestureDetector gesture={gesture} userSelect='auto'>
            <Animated.View style={[styles.bottomSheet, animatedStyle, {height: screenHeight, borderRadius: 20}]}>
                <View style={styles.handle} />
                <View style={styles.content}>
                    {children}
                </View>
            </Animated.View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    bottomSheet: {
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: '#854141ff',
        zIndex: 2000
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