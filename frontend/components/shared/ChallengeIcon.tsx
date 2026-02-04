import { StyleSheet, type ViewProps} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { Easing, SlideInRight, SlideOutRight } from "react-native-reanimated";
import { useThemeConfig } from "@/hooks/useThemeConfig";

export type ChallengeIconType = ViewProps & {
    type?: "incomplete" | "complete" | "repeatable" | "remove";
}

export function ChallengeIcon({
    style,
    type="incomplete",
}: ChallengeIconType) {
    const { theme } = useThemeConfig();

    return (
        <Animated.View style={[
            type === "incomplete" ? styles.incomplete : undefined,
            type === "complete" ? styles.complete : undefined,
            type === "repeatable" ? styles.repeatable : undefined,
            type === "remove" ? styles.remove : undefined,
            style
        ]}
        entering={type === "remove" ? // limit the animation only to the "remove" icon
            SlideInRight.duration(300).easing(Easing.inOut(Easing.linear)) 
            : undefined}
        exiting={ type === "remove" ?
            SlideOutRight.duration(300).easing(Easing.inOut(Easing.linear))
            : undefined}>
            {type === "incomplete" && null}
            {type === "complete" ? <Ionicons name="checkmark" size={22} color="green" /> : null}
            {type === "repeatable" ? <Ionicons name="repeat" size={24} color={theme.colors.text} /> : null}
            {type === "remove" ? <Ionicons name="remove" size={16} color="white" />
            : null}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    complete: {
        width: 26, 
        height: 26, 
        borderWidth: 2, 
        borderColor: "green", 
        borderRadius: 999, 
        justifyContent: "center", 
        alignItems: "center"
    },
    incomplete: {
        width: 26, 
        height: 26, 
        borderWidth: 2, 
        borderColor: "#5a5a5aff", 
        borderRadius: 999, 
        justifyContent: "center", 
        alignItems: "center"
    },
    repeatable: {
        width: 26, 
        height: 26, 
        justifyContent: "center", 
        alignItems: "center"
    },
    remove: {
        width: 22, 
        height: 22, 
        backgroundColor: "#ff2c2c",
        borderRadius: 999, 
        justifyContent: "center", 
        alignItems: "center"
    }
})