import { ScrollView, StyleSheet, View} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

type WrapperProps = {
    children: React.ReactNode
};

// SafeAreaView adds vertical padding which makes the app look weird on mobile. Consider using View instead or tweak SafeAreaView

export const Wrapper = ({ children }: WrapperProps) => {
    return (
        <Animated.View style={styles.wrapper}
                        entering={FadeIn.springify().damping(80).stiffness(200)}
                        exiting={FadeOut.springify().damping(80).stiffness(200)}>
            <ScrollView showsVerticalScrollIndicator={false}> 
                {children}
            </ScrollView>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        minHeight: 752,
        backgroundColor: '#c5c5c5'
    },
})