import { useGlobalStyles } from '@/styles/globalStyles';
import { View, Image, useWindowDimensions } from 'react-native'
import { ThemedText } from '../ThemedText';
import { OnboardingPageProps } from '@/utils/pagination'

export default function OnboardingPage({ item }: OnboardingPageProps) {
    const { width } = useWindowDimensions();
    const globalStyles = useGlobalStyles();
    return (
        <View style={[{ width }, globalStyles.onboardingWrapper]}>
            <Image style={{ width: 341, height: 341 }} source={item.image} />
            <ThemedText type="title" style={{maxWidth: 351, textAlign: "center"}}>{item.title}</ThemedText>
            <ThemedText style={{maxWidth: 351, textAlign: "center"}}>{item.description}</ThemedText>
        </View>
    )
}