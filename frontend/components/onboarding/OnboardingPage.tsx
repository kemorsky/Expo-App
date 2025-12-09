import { StyleSheet, View, Text, Image, useWindowDimensions } from 'react-native'
import { OnboardingPageProps } from '@/utils/pagination'

export default function OnboardingPage({ item }: OnboardingPageProps) {
    const { width } = useWindowDimensions();
    return (
        <View style={[{ width }, styles.wrapper]}>
            <Image style={{ width: 340, height: 340 }} source={item.image} />
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "#d48585ff",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start"
    }
})