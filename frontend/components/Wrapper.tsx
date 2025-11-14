import { StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

type WrapperProps = {
    children: React.ReactNode
};

export const Wrapper = ({ children }: WrapperProps) => {
    return (
        <SafeAreaView style={styles.wrapper}>
            {children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        minHeight: '100%',
        flexDirection: 'column',
        gap: 24,
        padding: 12,
        backgroundColor: '#c5c5c5'
    },
})