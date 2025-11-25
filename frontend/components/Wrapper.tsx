import { ScrollView, StyleSheet, View} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

type WrapperProps = {
    children: React.ReactNode
};

// SafeAreaView adds vertical padding which makes the app look weird on mobile. Consider using View instead or tweak SafeAreaView

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