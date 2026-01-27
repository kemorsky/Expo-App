import { StyleSheet, View, type ViewProps } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export type ChallengeIconType = ViewProps & {
    type?: "incomplete" | "complete" | "remove";
}

export function ChallengeIcon({
    style,
    type="incomplete",
    ...rest
}: ChallengeIconType) {

    return (
        <View style={[
            type === "incomplete" ? styles.incomplete : undefined,
            type === "complete" ? styles.complete : undefined,
            type === "remove" ? styles.remove : undefined,
            style
        ]}
        {...rest}>
            {type === "incomplete" && null}
            {type === "complete" ? <Ionicons name="checkmark" size={22} color="green" /> : null}
            {type === "remove" ? <Ionicons name="remove" size={22} color="red" /> : null}
        </View>
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
    remove: {
        width: 26, 
        height: 26, 
        borderWidth: 2, 
        borderColor: "red", 
        borderRadius: 999, 
        justifyContent: "center", 
        alignItems: "center"
    }
})