import { StyleSheet } from "react-native";
import { type PaginationProps } from "@/utils/pagination";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";

type PaginatorDotProps = {
    index: number;
    width: number;
    scrollX: PaginationProps["scrollX"];
}

export default function PaginatorDot({ index, width, scrollX }: PaginatorDotProps) {

    const animatedStyle = useAnimatedStyle(() => {
        const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width
        ];

        return {
            width: interpolate(scrollX.value, inputRange, [20, 36, 20], "clamp"), // (related to size) initial state -> active state -> inactive state
            opacity: interpolate(scrollX.value, inputRange, [0.3, 1, 0.3], "clamp")
        }
    });

    return (
        <Animated.View
            key={index}
            style={[styles.dot, animatedStyle]}
        />
    );
}

const styles = StyleSheet.create({
    dot: {
        height: 20,
        width: 20,
        borderRadius: 999,
        backgroundColor: "#300808ff"
    }
})