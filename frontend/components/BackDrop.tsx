import { View, Text, StyleSheet } from "react-native";
import Animated, { interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";

type Props = {
    translateY: SharedValue<number>,
    openY: number,
    closedY: number,
}

export const BackDrop = ({translateY, openY, closedY  }: Props) => {
    const backDropAnimation = useAnimatedStyle(() => {
        const opacity = interpolate(
            translateY.value,
            [openY, closedY],
            [0, 0.5]
        )
        const display = opacity === 0 ? 'none' : 'flex'
    
    return {
        opacity, display
    }
    })


    return (
        <Animated.View style={[styles.backDrop, backDropAnimation]}>
            <Text>Backdrop</Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    backDrop: {
        backgroundColor: '#000000',
        display: 'none'
    }
})