import { ScrollView, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

type WrapperProps = {
    children: React.ReactNode
};

export const Wrapper = ({ children }: WrapperProps) => {
    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView showsVerticalScrollIndicator={false}> 
                {children}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        minHeight: 752,
        backgroundColor: '#c5c5c5'
    },
})