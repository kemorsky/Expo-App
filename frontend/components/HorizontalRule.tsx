import { View, StyleSheet } from "react-native"

export const HorizontalRule = () => {
    return (
        <View style={styles.horizontalRule} />
    )
}

const styles = StyleSheet.create({
    horizontalRule: {
        borderBottomWidth: 1,
        borderColor: '#000000'
    }
})