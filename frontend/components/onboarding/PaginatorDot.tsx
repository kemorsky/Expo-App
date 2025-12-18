import { type PaginationProps } from "@/utils/pagination";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";
import { useGlobalStyles } from "@/styles/globalStyles";

type PaginatorDotProps = {
    index: number;
    width: number;
    scrollX: PaginationProps["scrollX"];
}

export default function PaginatorDot({ index, width, scrollX }: PaginatorDotProps) {
    const globalStyles = useGlobalStyles();

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
            style={[globalStyles.dot, animatedStyle]}
        />
    );
};